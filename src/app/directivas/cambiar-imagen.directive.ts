import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appCambiarImagen]'
})
export class CambiarImagenDirective {

@Input()TipoClima:string='';

  constructor() { }

}
