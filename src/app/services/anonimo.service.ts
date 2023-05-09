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

  getLavaderos(page: number = 1){
    return this.http.get(`${this.apiUrl}lavaderos`, { params: { page: page.toString() } });
  }

  getLavadero(id: string){
    return this.http.get(`${this.apiUrl}lavadero/${id}`, this.httpOptions);
  }

}
