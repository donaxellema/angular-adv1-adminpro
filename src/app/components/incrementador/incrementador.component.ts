import { Component, Input, Output,EventEmitter,OnInit } from '@angular/core';
//import { EventEmitter } from 'events';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  ngOnInit(){
    //throw new Error("Method not implemented.")
    this.btnClass = `btn ${this.btnClass}`;
  }
//manera de renombrar el argumento que se recive desde el componente padre
  @Input('valor') progreso: number=50;
  //@Input() progreso: number=50;
  @Output() valorsalida: EventEmitter<number> = new EventEmitter();

  //----
  @Input() btnClass: string='btn btn-primary';


  cambiarValor (valor:number){

    if (this.progreso >= 100 && valor>=0) {
      this.valorsalida.emit(100);
      return this.progreso=100;
    }

    if (this.progreso <= 0 && valor < 0) {
      this.valorsalida.emit(0);
      return this.progreso=0;

    }

    this.progreso=this.progreso +valor;
    this.valorsalida.emit(this.progreso);
    
  }


  onChangue(nuevoValor: number){
    if (nuevoValor >= 100) {
      this.progreso = 100;
    }else if(nuevoValor <= 0){
      this.progreso = 0;
    }else{
      this.progreso = nuevoValor;
    }
    this.valorsalida.emit(this.progreso);
  }
  
}
