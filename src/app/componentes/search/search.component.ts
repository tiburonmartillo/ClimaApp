import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fromEvent } from 'rxjs';
import { pluck, debounceTime, switchMap, map, tap } from 'rxjs/operators';
import { Clima, climafiltrado } from 'src/app/interfaces/clima.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @ViewChild('inputciudad') inputCiudad: ElementRef;

  private url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  private apikey = `&appid=2e4052771acecee2f3a674d63d8ab204`;
  public climaFiltrado: climafiltrado;
  public MostrarTarjeta: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.ObtenerClimaActual();
  }

  Irhome() {
    this.router.navigate(['']);
  }

  private ObtenerClimaActual() {
    fromEvent(this.inputCiudad.nativeElement, 'keyup')
      .pipe(
        tap(() => (this.MostrarTarjeta = false)),
        debounceTime(1500),
        pluck('target', 'value'),
        switchMap((nombreCiudad) =>
          this.http.get(`${this.url}${nombreCiudad}${this.apikey}`).pipe(
            map((clima: Clima) => {
              return {
                Ciudad: clima.name,
                ClimaActual: clima.weather[0].main,
                temperaturaActual: clima.main.temp,
                temperaturaMaxima: clima.main.temp_max,
                temperaturaMinima: clima.main.temp_min,
                Imagen: clima.weather[0].icon,
              };
            })
          )
        )
      )
      .subscribe(
        (objetoFiltrado: climafiltrado) => {
          this.climaFiltrado = objetoFiltrado;
          this.MostrarTarjeta = true;
        },
        () => {
          Swal.fire({
            icon: 'error',
            title: 'Hubo un error',
            text: 'El nombre de la ciudad no existe',
            footer: '<a href>Why do I have this issue?</a>',
          });
          this.ObtenerClimaActual();
        }
      );
  }
}
