import { Injectable } from '@angular/core';
import { cuenta } from '../interfaces/cuenta'
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: Firestore) { }



  getCuentas(): Observable<cuenta[]> {
    const cuentasRef = collection(this.firestore, 'cuentas');
    return collectionData(cuentasRef, { idField: 'id'}) as Observable<cuenta[]>;
  }
 
  getCuentaById(id): Observable<cuenta> {
    const cuentasRef = doc(this.firestore, `cuentas/${id}`);
    return docData(cuentasRef, { idField: 'id' }) as Observable<cuenta>;
  }
 
  addCuenta(cuenta: cuenta) {
    const cuentasRef = collection(this.firestore, 'cuentas');
    return addDoc(cuentasRef, cuenta);
  }
 
  deleteCuenta(cuenta:cuenta) {
    const cuentasRef = doc(this.firestore, `cuentas/${cuenta.id}`);
    return deleteDoc(cuentasRef).catch(error=>{console.log(error)});
  }
 //Falta update
  updateCuenta(cuenta: cuenta) {
    const cuentasRef = doc(this.firestore, `cuentas/${cuenta.id}`);
    return updateDoc(cuentasRef, {titulo:cuenta.titulo, ingresos:cuenta.ingresos, gastos:cuenta.gastos,iva:cuenta.iva,irpf:cuenta.irpf,is:cuenta.is});
  }
}