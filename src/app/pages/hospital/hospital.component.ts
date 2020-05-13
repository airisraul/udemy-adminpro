import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: []
})
export class HospitalComponent implements OnInit {

  hospitales: Hospital[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {

    this.cargarHospitales();

    this._modalUploadService.notificacion
          .subscribe( () => this.cargarHospitales() );
  }

   cargarHospitales(){

    this.cargando = true;
    this._hospitalService.cargarHospitales()
        .subscribe( hospitales => this.hospitales = hospitales)
          // .subscribe( (resp: any) => {
          //   this.totalRegistros = resp.total;
          //   this.hospitales = resp.hospitales;
    this.cargando = false;
          // });
  }

  mostrarModal( id: string ){
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  buscarHospital( termino: string){

    // console.log (termino);

    if ( termino.length <= 0 ){
      this.cargarHospitales();
      return;
    }
    this.cargando = true;

    this._hospitalService.buscarHospital( termino )
          .subscribe( (hospitales: Hospital[]) => {

            this.hospitales = hospitales;
            this.cargando = false;
          });
  }

  crearHospital(){
    Swal.fire({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then( (result ) => {
       if ( !result || result.value.length === 0 ){
         return;
       }
       this._hospitalService.crearHospital( result.value )
       .subscribe( () => this.cargarHospitales());
    });
  }

  guardarHospital( hospital: Hospital ){

    this._hospitalService.actualizarHospital( hospital )
            .subscribe();
  }

  borrarHospital( hospital: Hospital ){
   
    this._hospitalService.borrarHospital( hospital._id )
                .subscribe( resp => {
                  // console.log( resp);
                  this.cargarHospitales();
                });
  }

  // cambiarDesde( valor: number) {

  //   let desde = this.desde + valor;
    
  //   if ( desde >= this.totalRegistros ) {
  //     return;
  //   }
  //   if ( desde < 0 ) {
  //     return;
  //   }
  //   this.desde += valor;
  //   this.cargarHospitales();

  // }

  actualizarImagen( hospital: Hospital ) {
    this._modalUploadService.mostrarModal('hospitales', hospital._id);
  }

}
