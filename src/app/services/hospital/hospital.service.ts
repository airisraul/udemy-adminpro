import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  token: string;
  totalRegistros: number = 0;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService
  ) {
  }

  cargarHospitales(){
    let url = URL_SERVICIOS + '/hospital';
     
    return this.http.get( url )
       .pipe(map( (resp: any) => {
        this.totalRegistros = resp.total;
        console.log(resp.total);
        return resp.hospitales;
     }));
  }

  obtenerHospital( id: string ){

    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url )
              .pipe(map( (resp: any) => resp.hospital ));

  }

  buscarHospital( termino: string ){

    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url )
              .pipe(map( (resp: any) => resp.hospitales ));
  }

  actualizarHospital( hospital: Hospital ){

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, hospital )
            .pipe(map( (resp: any) => {

              Swal.fire('Hospital actualizado', hospital.nombre, 'success' );
              return resp.hospital ;
            }));

  }

  borrarHospital( id: string ){

    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                .pipe(map( resp => {
                  Swal.fire('Borrado!', 'El registro ha sido eliminado.', 'success');
                  return true;
                }));
  }

  crearHospital( nombre: string ){

    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre })
      .pipe(map( ( resp: any) => resp.hospital ));

  }

}
