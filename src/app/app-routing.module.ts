import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'lista-empleos',
    loadChildren: () => import('./shared/pages/lista-empleos/lista-empleos.module').then( m => m.ListaEmpleosPageModule)
  },
  {
    path: 'empleo/:id',
    loadChildren: () => import('./shared/pages/empleo/empleo.module').then( m => m.EmpleoPageModule)
  },
  {
    path: 'crear-empleo',
    loadChildren: () => import('./shared/pages/crear-empleo/crear-empleo.module').then( m => m.CrearEmpleoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
