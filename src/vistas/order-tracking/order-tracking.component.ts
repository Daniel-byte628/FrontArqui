import { Component, OnInit } from '@angular/core';
import { getStringNoLocale, getUrl } from '@inrupt/solid-client';
import { VCARD } from '@inrupt/vocab-common-rdf';
import { SolidAuthService } from '../../controlador/service/solid-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.css'
})
export class OrderTrackingComponent implements OnInit {
  address: string = '';
  locality: string = '';
  postalCode: string = '';
  region: string = '';
  countryName: string = '';

  // Coordinates for Carrera 7 No. 40 - 62, Pontificia Universidad Javeriana, Bogotá, Colombia
  userLocation: google.maps.LatLngLiteral = { lat: 4.628971, lng: -74.065967 };
  zoom = 12;
  userMarkerOptions: google.maps.MarkerOptions = { draggable: false, icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' };
  distributionMarkerOptions: google.maps.MarkerOptions = { draggable: false, icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' };

  markerPositions: google.maps.LatLngLiteral[] = [this.userLocation];

  // Hard-coded distribution centers
  distributionCenters: { position: google.maps.LatLngLiteral, name: string, shippingCost: number }[] = [
    { position: { lat: 4.748847, lng: -74.100308 }, name: 'Suba', shippingCost: 3.00 }, // Suba
    { position: { lat: 4.626570, lng: -74.138561 }, name: 'Kennedy', shippingCost: 4.00 }, // Kennedy
    { position: { lat: 4.678574, lng: -74.149616 }, name: 'Fontibon', shippingCost: 5.00 }  // Fontibon
  ];

  selectedDistributionCenter = this.distributionCenters[0]; // Default center

  constructor(private solidAuthService: SolidAuthService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    const webId = localStorage.getItem('webId');
    console.log(webId);
    if (webId) {
      const profile = await this.solidAuthService.fetchProfile(webId);

      const addressUrl = getUrl(profile, VCARD.hasAddress);
      if (addressUrl) {
        const addressNode = await this.solidAuthService.fetchProfile(addressUrl);
        if (addressNode) {
          this.address = getStringNoLocale(addressNode, VCARD.street_address) || '';
          this.locality = getStringNoLocale(addressNode, VCARD.locality) || '';
          this.postalCode = getStringNoLocale(addressNode, VCARD.postal_code) || '';
          this.region = getStringNoLocale(addressNode, VCARD.region) || '';
          this.countryName = getStringNoLocale(addressNode, VCARD.country_name) || '';
        } else {
          console.error('No se pudo obtener la información de dirección del perfil.');
        }
      } else {
        console.error('No se encontró la URL de la dirección en el perfil.');
      }
    } else {
      console.error('No se encontró el webId en el almacenamiento local.');
    }
  }

  selectDistributionCenter(center: any): void {
    this.selectedDistributionCenter = center;
    this.drawRoute();
  }

  drawRoute(): void {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: this.userLocation,
      zoom: this.zoom
    });

    directionsRenderer.setMap(map);

    const request = {
      origin: this.userLocation,
      destination: this.selectedDistributionCenter.position,
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, (result, status) => {
      if (status === 'OK' && result) {
        directionsRenderer.setDirections(result);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  }

  confirmSelection(): void {
    this.router.navigate(['/checkout'], {
      state: { selectedDistributionCenter: this.selectedDistributionCenter }
    });
  }
}
