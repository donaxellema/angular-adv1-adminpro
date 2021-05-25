import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';


declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  //public linkTheme = document.querySelector('#theme');

  //inject the service in contructor
  constructor(private settingsService:SettingsService ) { }

  ngOnInit(): void {
    /**↓ inicio para el llamado de una funcion jquery*/
    customInitFunctions();
    /**↓ fin para el llamado de una funcion jquery*/

    /**↓ esto se paso al servicio */
    /* const url = localStorage.getItem('theme')  || "./assets/css/colors/purple-dark.css";
    this.linkTheme.setAttribute('href',url);
    */
   /**↑ esto pase al servicio de settings dentro de la carpteta de servicios */

  }

}
