import { Component, OnInit } from '@angular/core';
import { EmpleosService } from '../../services/empleos.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-empleo',
  templateUrl: './empleo.page.html',
  styleUrls: ['./empleo.page.scss'],
})
export class EmpleoPage implements OnInit {

  empleo: Observable<any>;
  
  constructor(private empleosService: EmpleosService,
    private route: ActivatedRoute) { }

  async ngOnInit() {
   const id = this.route.snapshot.paramMap.get("id")
   this.empleo = this.empleosService.getEmpleo(id);
  
   console.log("observable",this.empleo);

   this.empleo.subscribe(data => {
     console.log("suscribe",data);

   })

   
   let telefonos = this.empleosService.getTelefonos(id);
  
   console.log("observable",telefonos);

   telefonos.subscribe(data => {
     console.log("Suscribe telefonos",data);
   
    })
   
   
   
   //let telefonos = this.empleosService.getTelefnos(id);

   let auxEmpleado = await this.empleosService.getEmpleoById2(id);
   console.log("await", auxEmpleado.salario);
  }
}


