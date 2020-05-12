import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { switchAll } from 'rxjs/operators';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
   
    let url = URL_SERVICIOS + '/img';

   // tslint:disable-next-line: align
   if ( !img ) {
    return url + '/usuarios/xxx';
   }

  // tslint:disable-next-line: align
  if ( img.indexOf('https') >= 0 ) {
    return img;
  }

  // tslint:disable-next-line: align
  switch( tipo ) {

    case 'usuario':
      url += '/usuarios/' + img;
    break;

    case 'medico':
       url += '/medicos/' + img;
    break;

    case 'hospital':
       url += '/hospitales/' + img;
      break;

      default:
        console.log('Tipo de imagen no existe, usuario, medicos, hospitales');
        url += '/usuarios/xxx';
  }

    return url;
  }
}

