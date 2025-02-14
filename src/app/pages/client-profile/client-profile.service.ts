import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientProfileService {
  private apiUrl = `${environment.apiBaseUrl}`;
  constructor(private http: HttpClient) { }

  getCientProfileDetails(){
    return this.http.get(`${this.apiUrl}/clients`);
  }
}
