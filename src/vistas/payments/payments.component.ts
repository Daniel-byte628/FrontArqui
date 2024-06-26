import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsShoppingCart } from '../../modelo/ItemsShoppingCart';
import * as emailjs from 'emailjs-com';
import { OrderItemService } from '../../controlador/servicios/order-item.service';

interface PaymentDetails {
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  billingAddress: string;
}

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  cartItems: ItemsShoppingCart[] = [];
  totalPrice: number = 0;
  paymentDetails: PaymentDetails = {
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: ''
  };

  // Default distribution center and shipping cost
  defaultDistributionCenter = {
    name: 'Default Center',
    shippingCost: 5.00 // default shipping cost
  };

  selectedDistributionCenter = this.defaultDistributionCenter;

  constructor(private router: Router, private orderItemService:OrderItemService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.cartItems = navigation.extras.state['cartItems'] || [];
      this.totalPrice = navigation.extras.state['totalPrice'] || 0;
      if (navigation.extras.state['selectedDistributionCenter']) {
        this.selectedDistributionCenter = navigation.extras.state['selectedDistributionCenter'];
      }
    }
  }

  ngOnInit(): void {
    this.updateTotalPrice();
  }

  updateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      if (item.product && item.product.unitCost !== undefined) {
        return total + (item.quantityProducts * item.product.unitCost);
      }
      return total;
    }, 0) + this.selectedDistributionCenter.shippingCost;
  }

  changeDistributionCenter(): void {
    this.router.navigate(['/distributionCenters'], {
      state: { cartItems: this.cartItems, totalPrice: this.totalPrice }
    });
  }

  submitPayment(): void {
    this.orderItemService.simulatePayment().subscribe(
      response => {
        if (response.status === 'SUCCESS') {
          this.sendEmailConfirmation();
        } else {
          alert('No se pudo procesar el pago: no tiene fondos' );
        }
      },
      error => {
        console.error('Error en la simulación de pago:', error);
        alert('Hubo un error al procesar tu pago. Por favor, inténtalo de nuevo más tarde.');
      }
    );
  }


  validatePaymentDetails(details: PaymentDetails): boolean {
    return details.cardName !== '' &&
           details.cardNumber !== '' &&
           details.expiryDate !== '' &&
           details.cvv !== '' &&
           details.billingAddress !== '';
  }

  sendEmailConfirmation(): void {
    const cartItemsString = this.cartItems
      .map(item => {
        if (item.product) {
          return `${item.product.name} - Cantidad: ${item.quantityProducts} - Precio: ${item.quantityProducts * item.product.unitCost}`;
        } else {
          return '';
        }
      })
      .filter(item => item !== '')
      .join('<br>');

    const templateParams = {
      to_name: 'Daniel Gutierrez',
      from_name: 'Tienda',
      cartItems: cartItemsString,
      totalPrice: this.totalPrice
    };

    emailjs.send('service_8yhd8ie', 'template_6qp2yig', templateParams, 'NOncbOmjeHrrdEHWU')
      .then(() => {
        alert('¡Pedido realizado con éxito! Se ha enviado un correo electrónico de confirmación.');
        this.saveTotalPriceToLocalStorage();
        this.createOrder(); 
      })
      .catch((error) => {
        console.error('Error al enviar correo electrónico:', error);
        alert('Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo más tarde.');
      });
  }
  saveTotalPriceToLocalStorage(): void {
    let totalPriceArray: number[] = JSON.parse(localStorage.getItem('totalPrices') || '[]');
    totalPriceArray.push(this.totalPrice);
    localStorage.setItem('totalPrices', JSON.stringify(totalPriceArray));
  }
  createOrder(): void {
    const userId = parseInt(localStorage.getItem('userId') || '0');
    if (!userId) {
      console.error('El userId no es válido o no se encontró en el almacenamiento local.');
      return;
    }

    const orderData = {
      address: 'Cr 7 no 2-35',
      clientName: 'Daniel G',
      city: 'BOgota',
      deliveredAt: new Date().toISOString(),
      clientId: userId
    };

    this.orderItemService.createOrder(userId, orderData).subscribe(
      response => {
        console.log('Orden creada con éxito:', response);
        // Puedes realizar más acciones después de crear la orden aquí
      },
      error => {
        console.error('Error al crear la orden:', error);
      }
    );
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      if (item.product && item.product.unitCost !== undefined) {
        return total + (item.quantityProducts * item.product.unitCost);
      }
      return total;
    }, 0);
  }
}
