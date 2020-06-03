import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchComponent } from './componentes/search/search.component';
import { CardsWeatherComponent } from './componentes/cards-weather/cards-weather.component';

import { HttpClientModule } from "@angular/common/http";
import { KelvinCelsiusPipe } from './pipes/kelvin-celsius.pipe';
import { CambiarImagenDirective } from './directivas/cambiar-imagen.directive';
import { ContruirImagenPipe } from './pipes/contruir-imagen.pipe';
import { HomeComponent } from './componentes/home/home.component';
import { appRouting } from "./app.routes";
// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    CardsWeatherComponent,
    KelvinCelsiusPipe,
    CambiarImagenDirective,
    ContruirImagenPipe,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    appRouting,
    // SweetAlert2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
