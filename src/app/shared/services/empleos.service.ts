import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Empleo } from '../model/empleo';
import {first, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmpleosService {

  constructor(private afs: AngularFirestore) { }

  getEmpleos(): Observable<any[]>{
    return this.afs.collection('empleos').valueChanges();
  }

  getEmpleosPorNombre(): Observable<any[]>{
    return this.afs.collection('empleos', 
        ref => ref.where("titulo","==","ICC").
        orderBy('fecha', 'asc')).valueChanges();
  }


  getEmpleo(uid: string): Observable<any>{
    let itemDoc = this.afs.doc<any>(`empleos/${uid}`);
    return itemDoc.valueChanges();
  }

  saveEmpleo(empleo:Empleo){
    const refEmpleo = this.afs.collection("empleos");
    empleo.uid = this.afs.createId()
    const param = JSON.parse(JSON.stringify(empleo));
    refEmpleo.doc(empleo.uid).set(param,{ merge:true});
  }

  /*
  saveEmpleo2(uid:string, telefono:Empleo){
    const refTelefono = this.afs.collection("empleos").doc(uid).collection("telefonos");
    empleo.uid = this.afs.createId()
    const param = JSON.parse(JSON.stringify(empleo));
    refTelefono.doc(empleo.uid).set(param, {merge:true})
  }

*/

async getEmpleoById2(uid: string): Promise<Empleo>{
  try{
      let aux:any = await this.afs.collection("empleos", 
          ref => ref.where('uid', '==', uid))
                    .valueChanges().pipe(first()).toPromise().then(doc => {                    	  
                        return doc;
                    }).catch(error => {
                        throw error;
                    });
      if(aux.length==0)
          return undefined;
      return aux[0];
  }catch(error){
    console.error("Error", error);
    throw error;
  } 
}

getTelefonos(uid:string): Observable<any[]>{
  return this.afs.collection('empleos').doc(uid).collection("telefonos",
ref => ref.orderBy('numero','asc')).valueChanges(); 
}

async getTelefonos2(uid: string){
  return await this.afs.collection('empleos').doc(uid).collection("telefonos",
  ref => ref.orderBy('numero', 'asc')).valueChanges()
  .pipe(
    map(actions => {
      return actions.map(a => {
        let data: any = a;

        return{...data};
      });
    })
      
  );
}

 getEmpleos2(){
  return this.afs.collection('empleos').valueChanges()
  .pipe(
    map(actions => {
      return actions.map(a => {
        let data: any = a;
        data.iess = data.salario*0.945;
        return{...data};
      });
    })
      
  );
}

/**
 * 
 * @param empleo Objeto a persistit 
 */

async saveEmpleado2(empleo: Empleo){
  let uidEmpleo = this.afs.createId();
  let refCount = this.afs.firestore.collection("params").doc("secuencias");
  let refEmpleo = this.afs.firestore.collection("empleos").doc(uidEmpleo);

  return await this.afs.firestore
  .runTransaction(async transaction =>{
   const doc = await transaction.get(refCount);
   
   let newEmpleoNumber = 1;
   //Si este no existe crea el registro con un valor inicial
   if(!doc.exists){
     transaction.set(refCount, { empleoNumber: newEmpleoNumber});

   }else{
     //Si existe incrementa este en 1 
     newEmpleoNumber = doc.data().empleoNumber + 1;
     transaction.update(refCount, {
       empleoNumber: newEmpleoNumber
     });
   }

   empleo.uid = uidEmpleo;
   empleo.numero = newEmpleoNumber;

   transaction.set(refEmpleo, Object.assign({}, empleo));

   return newEmpleoNumber;
  })
  .then(orderNumber =>{
    return orderNumber;
  })
  .catch(error => {
    console.error("ERROR", JSON.stringify(error));
    throw error;
  })


}
  


}