import { Component, OnInit } from '@angular/core';
import { Empleo } from '../../model/empleo';
import { EmpleosService } from '../../services/empleos.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-crear-empleo',
  templateUrl: './crear-empleo.page.html',
  styleUrls: ['./crear-empleo.page.scss'],
})
export class CrearEmpleoPage implements OnInit {

  empleo: Empleo = new Empleo();
  base64Image: any; 
  icono:string = 'camera'

  constructor(private empleoService: EmpleosService,
              private camera: Camera) { }

  ngOnInit() {
  }

  saludar(data){
    console.log(data)
  }

  async guardarEmpleo(){
    console.log(this.empleo);

    let number = await this.empleoService.saveEmpleado2(this.empleo);
    console.log("Nuevo Registro almacenado", number);
    //this.empleoService.saveEmpleo(this.empleo);
  }

  tomarFoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
     console.log(this.base64Image);
    }, (err) => {
      console.error(err);
     // Handle error
    });
  }

  imagenCargada(e){
    console.log("imagenCargada");
    console.log(JSON.stringify(e));
    this.empleo.image = e;
  }

}
