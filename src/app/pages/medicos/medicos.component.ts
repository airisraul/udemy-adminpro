import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  totalMedicos: number = 0;
  cargando: boolean = true;

  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicoService.cargarMedicos()
      .subscribe( medicos => this.medicos = medicos );
  }

  cambiarDesde( valor: number) {

    let desde = this.desde + valor;

    if ( desde >= this.totalMedicos ) {
      return;
    }
    if ( desde < 0 ) {
      return;
    }
    this.desde += valor;
    this.cargarMedicos();

  }

  buscarMedico(termino: string){

    if (termino.length <= 0 ){
      this.cargarMedicos();
      return;
    }
    this._medicoService.buscarMedicos( termino )
        .subscribe( medicos => this.medicos = medicos);
  }

  borrarMedico( medico: Medico){

    this._medicoService.borrarMedico( medico._id)
      .subscribe( () => this.cargarMedicos());
  }
}
