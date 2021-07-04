import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private usuarioService:UsuarioService,
              private router:Router ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)/* : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  */
    {
      //ya no va a retornar una subscripcion
     /*  this.usuarioService.validarToken().subscribe(resp=>{
        console.log(resp);
      }) */
      //☻ sino va a retornar la peticion (el mismo se va subscribir y a desubscribir y retorna la respuesta )
      //console.log("Paso por el canActivate del guard");
    //return false;
    //☻↓ NOTA: para no cambiar esta instruccion se agrega el pipe y se pasa por el tap para evaluar la respuesta
    //LA PETICION SE VA ASUBISCRIBIR Y VA A MANEJAR EL UBSUBCRIBIR
    /* Si el usuario no tiene un token valido hay que sacarlo de esta pantalla*/
    return this.usuarioService.validarToken()
           .pipe(
            tap( estaAutenticado =>{
              //en si seria un efecto secundario que se va a dispara si no esta autenticado
              if(!estaAutenticado){
                this.router.navigateByUrl('/login');
              }
            })
          ) 
  }
  
}
