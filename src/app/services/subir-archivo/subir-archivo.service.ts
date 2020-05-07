import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }


  subirArchivo( archivo: File, tipo: string, id: string ){

    return new Promise( ( resolve, reject ) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append( 'imagen', archivo, archivo.name);

      xhr.onreadystatechange = function() {

        console.log('RESPUESTA: ' , xhr.readyState);
        if ( xhr.readyState === 4 ){
          console.log('STATUS: ' , xhr.status);
          if (xhr.status === 200 ){
            console.log(' Imagen subida');
            resolve( JSON.parse( xhr.response ) );
          }else{
            console.log('Fallo la subida');
            reject( xhr.response);
          }
        }
      };

      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
      console.log('url: ' , url);
      xhr.open('PUT', url, true);
      xhr.send( formData);

    });

  }

}
