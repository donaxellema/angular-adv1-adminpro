import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import {retry,take,map,filter} from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  // seccion de observables con RXJS

  //↓esta variable almacenara lo que tiene el subscribe
  public intervalSubs:Subscription;
  //↑
  constructor() { 
    

   /*  this.retornaObservable().pipe(
      //Es un retry permite intentar soluciones o repetir el proceso las veces que se deseee /
      retry(2)
    ).subscribe(
      //↓ Este es un callback /
      valor=> console.log('Subs: ', valor),
      error=>console.warn('Error', error),
      ()=>console.info('Obs terminado')
      /**↑ Este es un callback 
       * estan son las maneras de ejecutar instrucciones cuando termina el observable
      */
    /*); */
    //↓aqui igualo el intervalo subscripcion
    this.intervalSubs= this.retornaIntervalo()
    .subscribe(
      //(valor)=> console.log (valor)
      //es lo mismo que escribir console.log
      console.log
    )

  }
  

  
  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
    this.intervalSubs.unsubscribe();
  }



  retornaIntervalo():Observable <number> {

    return interval(100)
      .pipe(
        /* map(valor =>{ //recivio el valor de 0 y le suma el valor de 1 
          return valor + 1
        }) */
        map(valor => valor + 1),
        filter(valor => (valor % 2 === 0) ? true: false),
        take(10),
      );
    //return intervalo$; 
    //↑puedo pasar el return arriba y usarlo como en los observables
  }


  /**METODO QUE RETORNA OBSERVABLE que emite NUMEROS */
  retornaObservable () : Observable<number> {
    
    let i= -1;
    //↓ en el observable se debe definir el tipo de dato que devuelve en este caso number
    const obs$ = new Observable<number> ( observer => {
    /**↑ */  
      const intervalo = setInterval( () => {
        //console.log('tick');
        i++;
        observer.next(i);
        /** ↑ observer es una variable que defino, como es observer se agrega una propiedad .next
         * y llamo para enviar el valor que desee
          */

        if(i === 4){
          clearInterval(intervalo); //limpiamos el intervalo
          observer.complete();
        }

        if(i === 2){
          //i=0;
          //console.log('i=2 .... error');
          observer.error('i llego al valor de 2');
        }

      },1000)

    });

    return obs$;
  }

}
