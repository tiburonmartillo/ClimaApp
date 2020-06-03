import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, map } from 'rxjs/operators';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Clima, climafiltrado } from 'src/app/interfaces/clima.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  private apikey = `&appid=2e4052771acecee2f3a674d63d8ab204`;
  public ArrayClimaFiltrado:Array<climafiltrado>=[];
  public loading:boolean=true;

  constructor(private router: Router, private http: HttpClient) {
    this.getLocalStorage();
  }

  ngOnInit(): void {}
  
  IrAgregar() {
    this.router.navigate(['add']);
  }
  getLocalStorage() {
    const climas = JSON.parse(localStorage.getItem('climas'));
    if (climas !== null) {
      this.getClima(climas);
    }
  }
  getClima(climas: Array<string>) {
    from(climas).pipe(
      /**** concatMap*/
      concatMap((nombreClima) =>
        this.http.get(`${this.url}${nombreClima}${this.apikey}`)
        .pipe(
          /***Map */
          map((Clima: Clima) => {
            console.log(Clima)
            
            const climaFiltrado:climafiltrado={
              Ciudad: Clima.name,
              ClimaActual: Clima.weather[0].main,
              temperaturaActual: Clima.main.temp,
              temperaturaMaxima: Clima.main.temp_max,
              temperaturaMinima: Clima.main.temp_min,
              Imagen: Clima.weather[0].icon
            };
            return climaFiltrado;
          })
          /****Map */
        )
      )
      /****concatMap */
    )
    .subscribe(
      (climaFiltrado:climafiltrado)=>{
        this.ArrayClimaFiltrado.push(climaFiltrado);
        if(this.ArrayClimaFiltrado.length==climas.length){
          this.loading=false;
        }
        
      }
    )
  }
}
