import { Component } from '@angular/core';

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
  styleUrl: './payments.component.css'
})
export class PaymentsComponent {

  paymentDetails: PaymentDetails = {
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: ''
  };

  submitPayment(): void {
    if (this.validatePaymentDetails(this.paymentDetails)) {
      alert('Pago exitoso!');
      // Add your payment processing logic here
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

  validatePaymentDetails(details: PaymentDetails): boolean {
    // Simple validation logic
    return details.cardName !== '' &&
           details.cardNumber !== '' &&
           details.expiryDate !== '' &&
           details.cvv !== '' &&
           details.billingAddress !== '';
  }
}
