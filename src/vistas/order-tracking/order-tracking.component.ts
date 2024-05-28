import { Component } from '@angular/core';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.css'
})
export class OrderTrackingComponent {

  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor() { }

  ngOnInit(): void {
    // Fetch and set the map center and markers based on the order tracking information
    // For example:
    // this.center = {lat: orderLatitude, lng: orderLongitude};
    // this.markerPositions.push({lat: deliveryLatitude, lng: deliveryLongitude});
  }

}
