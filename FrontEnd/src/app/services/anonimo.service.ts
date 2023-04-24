import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class anonimoService {
  private apiUrl = 'http://localhost:4000/api/anonimo/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
  })};

  constructor(private http: HttpClient) {}

  getLavaderos(){
    return this.http.get(`${this.apiUrl}lavaderos`, this.httpOptions);
  }

}
