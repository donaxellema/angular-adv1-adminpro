import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  //se usa aqui por cuando la app de angular se crea, ya esta esta etiqueta dentro de la plantilla
  //caso contrario si se genera debe manejarse dentro del mismo componente en el ng-on-init
  private linkTheme = document.querySelector('#theme');

  constructor() {
    //console.log('settings Serivce init');
    const url = localStorage.getItem('theme')  || "./assets/css/colors/purple-dark.css";
    this.linkTheme.setAttribute('href',url);
   }

   changueTheme(theme:string  ){
    //const linkTheme = document.querySelector('#theme');
    //const url=  `./assets/css/colors/${theme}.css`;
    const url= "./assets/css/colors/"+theme+".css";
    //console.log(url);
    this.linkTheme.setAttribute('href',url);
    localStorage.setItem('theme',url);
    //↓ahora aqui se llama a la funcion para que continue el proceso
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    const links = document.querySelectorAll('.selector');//primero obtener la referencia y luego ejecutar la funcion
    /**↑cada vez que se ejecute esta opcion salta al DOM si es pesado el proceso no debe hacerse de esta manera*/
    

    //const links = document.querySelectorAll('.selector');
    //console.log(links);
    links.forEach( elem =>{
      //para remover una clase en tiempo de ejecucion
      elem.classList.remove('working');
      //para obtener un atributo personalizado se usaria getAttribute
      const btntheme = elem.getAttribute('data-theme');
      const btnThemeUrl= `./assets/css/colors/${btntheme}.css`;
      const currentTheme = this.linkTheme.getAttribute('href');
  
      if(btnThemeUrl === currentTheme ){
        elem.classList.add('working');
      }
    })
    }


}
