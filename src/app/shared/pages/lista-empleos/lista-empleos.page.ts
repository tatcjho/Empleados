import { Component, OnInit } from '@angular/core';
import { EmpleosService } from '../../services/empleos.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { $ } from 'protractor';

@Component({
  selector: 'app-lista-empleos',
  templateUrl: './lista-empleos.page.html',
  styleUrls: ['./lista-empleos.page.scss'],
})
export class ListaEmpleosPage implements OnInit {
  
  empleados: Observable<any[]>
  empleados2: any[];
  cosas:any = new Array;
  
  constructor(private empleosService: EmpleosService,
    public router: Router) { }

  async ngOnInit() {
    
    this.empleados =  this.empleosService.getEmpleos2();
    
    this.empleados.subscribe(data => {
      this.empleados2 = data;
      for(let aux of data){
        aux.iess = aux.salario * 0.095;
      }
      
    });
    
    
    this.cosas.push({id: 20, nombre: "Juan"})
    this.cosas.push({id: 21, nombre: "Jaime"})
    this.cosas.push({id: 22, nombre: "Raul"})
  
  }

  showEmpleo(id: any){
    this.router.navigate([`empleo/${id}`])

  }

  //Se utiliza cuando se tenga una lista observable asincrona
  trackByFn(index,obj){
    return obj.uid;
  }

  showCrearEmpleo(){
    this.router.navigate([`crear-empleo`])
  }

}
