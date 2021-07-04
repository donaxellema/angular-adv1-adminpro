import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'; //lanza un efecto secundario



import { environment } from 'src/environments/environment';



import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

const base_url= environment.base_url;
declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2:any;
  public usuario:Usuario;
  
  constructor( private http:  HttpClient,
               private router:Router,
               private ngZone:NgZone) { 
    this.googleInit();
  }

  /**Funcion agregada el 01/07 */
  get token():string{
    return localStorage.getItem('token') || '';
  }

  /**Funcion agregada el 01/07 extrae uid*/
  get uid():string{
    return this.usuario.uid || '';
  }

  /**↓ Se paso este codigo de startApp de login a usuario service */
  googleInit(){
    //las promesas siempre van a ejecutarse
    return new Promise( resolve => {

      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '693712588614-uvnb8knbfgkl7b6jo04icothnr95bg98.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        
        resolve;
      });
      
    })
  }
  /**↑ Se paso este codigo de startApp de login a usuario service */
  
  /**Logout */
  logout(){
    localStorage.removeItem('token');
    this.auth2.signOut().then(()=>{
      //console.log('User signed out.');
      //NOTA: se utiliza ngZone para manejar la navegacion con angular dado que google es quien toma el control de la navegacion por un momento
      //para redireccionar a login OJO es para que trabaje con el logout cuando me registro con google
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      })
    });
  }

  //Cuando alguien quiera ingresar a la ruta tiene que verifcar el token
  validarToken():Observable<boolean>{
    //const token = localStorage.getItem('token') || '';
    //hace la paeticion al backend para saber si el token aun es valido
    return this.http.get(`${ base_url }/login/renew`,{
      headers:{
        'x-token': this.token
      }
    })//si pasa el token usa el pipe
    .pipe(
      map((resp:any) =>{
        console.log(resp);
        const { email, google, nombre, role, img='', uid
        }= resp.usuario;
        this.usuario= new Usuario( nombre, email, '', img, google, role, uid);
        

        localStorage.setItem('token',resp.token);//esto se ejecuta antes de entrar al dasahboard
        return true;
      }),//para trasnformar la respuesta a un valor booleano
      //map(resp => true),
      //para poder capturar los errores EL CATCH ATRAPA EL ERROR QUE OCURRA EN ESTE FLUJO
      // Y REGRESA UN OBSERVABLE CON VALOR EN ESTE CASO DE FALSE CLARO SI NO HACE LA AUTENTICACION
      //ademas se importa el "of" de rxjs el que permite crear un observable
      //en base al valor que se ponga dentro de el en este caso el false
      //es para que no rompa el ciclo
      catchError( error => of (false))
    );

  }

  //En este caso se utilizara un any como parametro pero 
  //normalmente se utliza una interfaz
  crearUsuario( formData:RegisterForm ){
    //el formdata es la DATA que envio en la ruta
    return this.http.post(`${ base_url }/usuarios`, formData )
              .pipe(
                tap(  (resp:any) =>{
                  //console.log(resp);
                  localStorage.setItem('token',resp.token)
                })
              )//esto siempre regresara un observable
  }

  //actualizar perfil
  actualizarPerfil(data:{ email: string, nombre: string, role: string}) {
  
    data = {
      ...data,
      role: this.usuario.role
    };

    return this.http.put(`${ base_url }/usuarios/${this.uid}`, data,{
      headers:{
        'x-token': this.token
      }
    });
  }

  //Login dentro de plataforma
  login( formData:LoginForm ){
    //el formdata es la DATA que envio en la ruta
    return this.http.post(`${ base_url }/login`, formData )
                .pipe(
                  tap(  (resp:any) =>{
                    //console.log(resp);
                    localStorage.setItem('token',resp.token)
                  })
                )//esto siempre regresara un observable
    
  }
  
  loginGoogle( token ){
    //el formdata es la DATA que envio en la ruta
    //Nota ya no se envia formdata pero como es un objecto se envia el token en llaves para que se interprete como objeto
    return this.http.post(`${ base_url }/login/google`, {token} )
                .pipe(
                  tap(  (resp:any) =>{
                    //console.log(resp);
                    localStorage.setItem('token',resp.token)
                  })
                )//esto siempre regresara un observable
    
  }
}
