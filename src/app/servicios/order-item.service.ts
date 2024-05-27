import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {
  constructor(
      public id: number,
      public name: string,
      public description: string,
      public unitPrice: number,
      public quantity: number
    ) {}
}
