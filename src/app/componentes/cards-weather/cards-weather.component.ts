import { Component, OnInit, Input } from '@angular/core';
import { climafiltrado } from 'src/app/interfaces/clima.interface';

@Component({
  selector: 'app-cards-weather',
  templateUrl: './cards-weather.component.html',
  styleUrls: ['./cards-weather.component.css']
})
export class CardsWeatherComponent implements OnInit {

  @Input() climaFiltradoRecibido:climafiltrado;

  constructor() { }

  ngOnInit(): void {
    console.log(this.climaFiltradoRecibido);
  
  }
  AgregarCiudad(){

const Arrayclima=this.getLocalStorage();
Arrayclima.push(this.climaFiltradoRecibido.Ciudad);
localStorage.setItem('climas',JSON.stringify(Arrayclima));
  }

  public getLocalStorage() {
    const Arrayclima=JSON.parse(localStorage.getItem('climas'));

    if(Arrayclima==null){
      return []
    }else{
      return Arrayclima;
    }
  }

}
