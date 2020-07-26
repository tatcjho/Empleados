import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearEmpleoPageRoutingModule } from './crear-empleo-routing.module';

import { CrearEmpleoPage } from './crear-empleo.page';
import { ImageUploadComponent } from 'src/app/components/image-upload/image-upload.component';
import { TestcomponentComponent } from 'src/app/componentes/testcomponent/testcomponent.component';
import {FileChooserComponent} from 'src/app/components/file-chooser/file-chooser.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearEmpleoPageRoutingModule
  ],
  declarations: [CrearEmpleoPage, ImageUploadComponent, TestcomponentComponent,FileChooserComponent],
  exports: [ImageUploadComponent, TestcomponentComponent,FileChooserComponent]

})
export class CrearEmpleoPageModule {}
