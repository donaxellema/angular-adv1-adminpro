import { Component, OnInit } from '@angular/core';
import { rejects } from 'assert';
import { resolve } from 'dns';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios()
      .then(usuarios =>{
        console.log(usuarios);
      })

    //ejemplo de promesas
    //las promesas son parte propia de javascript si aparece el error es por que no tiene el callback
    //- significa que es para las lineas que estan funcionales
    //-const promesa = new Promise((resolve,reject)=>
    /**↓ El primer cuerpo que tiene la promesa es sincrono */
    //console.log('hola mundo');
    /**↑ El primer cuerpo que tiene la promesa es sincrono */

    /*- {
      if(false ){
        resolve('Hola mundo');
      }else{
        reject('Algo salio mal');
      }


    }); */

    //-promesa.then((mensaje)=>{
      //-console.log('Hey termine '+ mensaje);
      /**↑ este es el proceso que es asincrono */
    /*- })
    .catch(error => console.log('error en mi primesa ',error))

    
    console.log('Fin del Init'); */
    

  }

getUsuarios(){

  return  new Promise(resolve =>{
  //↑ otra forma 
  //const promesa = new Promise(resolve =>{
  fetch('https://reqres.in/api/users?page=2')
    .then(resp=> resp.json())
    .then(body=>resolve(body.data));
  });
  //return promesa;

  }

}
