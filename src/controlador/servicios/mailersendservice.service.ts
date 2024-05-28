import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailersendserviceService {

  private apiKey = 'mlsn.e2bba152e796e9555f8f4a97d352ed356f39ef96e3ae0c148839347c6b60aba6'; 
  private apiUrl = 'https://api.mailersend.com/v1/email';

  constructor(private http: HttpClient) {}

  sendEmail(emailData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    return this.http.post(this.apiUrl, emailData, { headers });
  }

}
