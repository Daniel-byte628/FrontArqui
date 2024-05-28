import { Component, OnInit } from '@angular/core';
import { getStringNoLocale, getUrl } from '@inrupt/solid-client';
import { VCARD } from '@inrupt/vocab-common-rdf';
import { SolidAuthService } from '../../controlador/service/solid-auth.service';

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

  constructor(private solidAuthService: SolidAuthService) { }

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
  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];


}
