import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { Usuario } from 'src/app/models/usuario.model';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  //formulario reactivo
  public perfilForm: FormGroup;
  //↑
  public usuario:Usuario;
  public imagenSubir:File;
  public imgTemp: any=null;
  

  constructor(
    private fb: FormBuilder,
    private usuarioService:UsuarioService,
    private fileUploadService: FileUploadService) {
    this.usuario=usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm=this.fb.group({
      nombre:[this.usuario.nombre, Validators.required],
      email:[this.usuario.email, [Validators.required,Validators.email]],
    });

  }

  actualizarPerfil(){
    //console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
    .subscribe( () =>{
      const {nombre,email}=this.perfilForm.value;
      //console.log(resp);
      this.usuario.nombre = nombre;
      this.usuario.email = email;

      Swal.fire('Guardado','Cambios fueron guardados','success');
    },(err)=> {
      console.log(err)
      Swal.fire('Error',err.error.msg,'error')
    });
  }


  cambiarImagen(file:File){
    console.log(file);
    this.imagenSubir=file;

    if(!file){
      return this.imgTemp=null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend=()=>{
      //console.log(reader.result);
      this.imgTemp=reader.result;
    }
  }

  subirImagen(){
    this.fileUploadService
    .actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid)//como es promesa se puede o no un then
    .then(img => {
      this.usuario.img=img;
      Swal.fire('Guardado','Imagen de usuario actualizada','success');
    }).catch(
      err=>{
        console.log(err);
      Swal.fire('Error','no se pudo subir la imagen','error')
      }
    )
  }

}
