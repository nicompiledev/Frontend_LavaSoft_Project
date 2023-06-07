import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeparatamentosService {

  constructor(private http: HttpClient) { }

  url: string = 'https://www.datos.gov.co/resource/xdk5-pm3f.json'
  getDepartamento(){

    return this.http.get(this.url)
    
  }
}
