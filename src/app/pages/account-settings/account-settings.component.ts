import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {
  //public linkTheme = document.querySelector('#theme');
  //public links: NodeListOf<Element> ;

  constructor( private settingsService: SettingsService) { }

  ngOnInit(): void {
    //this.links = document.querySelectorAll('.selector');//primero obtener la referencia y luego ejecutar la funcion
    //this.checkCurrentTheme();
    this.settingsService.checkCurrentTheme();
  }

  changueTheme(theme:string  ){
    this.settingsService.changueTheme(theme);
    //** ↓ Esto paso al servicio settings service */
    /* //console.log(theme);
    //const linkTheme = document.querySelector('#theme');
    //const url=  `./assets/css/colors/${theme}.css`;
    const url= "./assets/css/colors/"+theme+".css";
    //console.log(url);
    this.linkTheme.setAttribute('href',url);
    localStorage.setItem('theme',url); */
    //** ↑ Esto paso al servicio settings service para que quede mas limpio el componente */
    //this.checkCurrentTheme();
  }

 /*  checkCurrentTheme(){

  //const links = document.querySelectorAll('.selector');
  //console.log(links);
  this.links.forEach( elem =>{
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
  } */


}
