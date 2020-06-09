import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiClimaService {
  private url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  private apikey = `&appid=2e4052771acecee2f3a674d63d8ab204`;

  constructor(private http:HttpClient) { }

  public ObtenerClima(Ciudad:string){
return this.http.get(`${this.url}${Ciudad}${this.apikey}`)
  }
}
