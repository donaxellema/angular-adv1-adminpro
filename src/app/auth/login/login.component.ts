import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';


//como se importa mediante un script
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css' ]
})
export class LoginComponent implements OnInit {


  public formSubmitted = false;
  public auth2: any;

  public loginForm= this.fb.group({
    email:[localStorage.getItem('email') || '', [Validators.required, Validators.email]], 
    password:['', Validators.required],
    remember:[false]
  });



  constructor(private router:Router,
              private fb: FormBuilder,
              private usuarioService:UsuarioService,
              private ngZone:NgZone ) { }
  ngOnInit(): void {
    this.renderButton();
  }

  login(){
    //console.log('submit');
    
    //validacion de formulario faltante 
    //console.log(this.loginForm.value);

    this.usuarioService.login(this.loginForm.value)
    .subscribe(resp =>{
      console.log(resp);
      if(this.loginForm.get('remember').value){
        localStorage.setItem('email',this.loginForm.get('email').value);
      }else{
        localStorage.removeItem('email');
      }
      
      //EN CASO DE QUE SE HAGA CORRECTO QUE SE MUEVA AL DASHBOARD
      this.router.navigateByUrl('/');

    },(err)=> /* console.warn( err.error.msg ) */
    {
      //Si sucede un error
      Swal.fire('Error',err.error.msg,'error')
      
    });
    //this.router.navigateByUrl('/');

  }

  //var id_token = googleUser.getAuthResponse().id_token;
  
  
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
  }
  
  /* GOOGLE_ID=693712588614-uvnb8knbfgkl7b6jo04icothnr95bg98.apps.googleusercontent.com
  GOOGLE_SECRET=y7FpYXTVr8mk3o2GYeAHiaxd */

  //startApp() {
    //se paso a metodo async
  async startApp() {
    gapi.load('auth2', () =>{
      // Retrieve the singleton for the GoogleAuth library and set up the client.
     /*  this.auth2 = gapi.auth2.init({
        client_id: '693712588614-uvnb8knbfgkl7b6jo04icothnr95bg98.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      }); */

      this.usuarioService.googleInit();
      this.auth2=this.usuarioService.auth2;
      
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };

  //LOGIN DE GOOGLE
  attachSignin(element) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        (googleUser)=> {
          const id_token = googleUser.getAuthResponse().id_token;
          //console.log(id_token);
          this.usuarioService.loginGoogle(id_token)
          .subscribe(
            //SE COLOCO ESTO DENTRO DEL SUBSCRIBE POR QUE ES UN TRABAJO ASYNCRONO
            resp =>{
              //EN CASO DE QUE SE HAGA CORRECTO QUE SE MUEVA AL DASHBOARD
              //NOTA: ES LO MISMO QUE SE HACE EN LOGOUT DE GOOGLE se utiliza ngZone para manejar la navegacion con angular dado que google es quien toma el control de la navegacion por un momento
              //para redireccionar al DASBOARD OJO es para que trabaje con el login cuando me registro con google
              this.ngZone.run(()=>{
                this.router.navigateByUrl('/');
              })
              //this.router.navigateByUrl('/');
            });
          
          
          //TODO MOVER AL DASHBOARD
        }, (error)=> {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
