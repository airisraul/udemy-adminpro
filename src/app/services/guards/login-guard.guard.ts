import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor( 
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService,
    public router: Router
    ){}


  canActivate(){

  if ( this._usuarioService.estaLogueado() ){
    // console.log('PASO EL GUARD');
    return true;
  }else{
    console.log('Blqueado por guard');
    this.router.navigate(['/login']);
    return false;
  }
  }
}
