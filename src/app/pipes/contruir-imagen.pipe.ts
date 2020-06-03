import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contruirImagen'
})
export class ContruirImagenPipe implements PipeTransform {
private urlImagen:string='http://openweathermap.org/img/wn/'
private urliImagenComplementara='@2x.png'
  transform(value: string): unknown {
 
    return `${this.urlImagen}${value}${this.urliImagenComplementara}`;
  }

}
