import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Shipment {
  constructor(
    public id: number,
    public deliveryDate: string,
    public address: string,
    public customerName: string,
    public city: string
  ) {}
}
