import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Payment {
  constructor(
    public id: number,
    public date: string,
    public method: string,
    public amount: number,
    public status: string
  ) {}
}
