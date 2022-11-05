import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, collectionData, deleteDoc, docData, Firestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { addDoc, doc, DocumentReference, getFirestore, setDoc } from 'firebase/firestore';
import { observable, Observable } from 'rxjs';

export interface Setty {
  Excercise: string;
  Set: number;
  Reps: number;
  Weight: number;

}

@Injectable({
  providedIn: 'root'
})
export class FbService {
  constructor(private firestore: Firestore, private db: AngularFirestore) {}
  getData(date) {
    return new Promise<any>((resolve)=> {
      this.db.collection(date).valueChanges({ idField: 'id' }).subscribe(date => resolve(date));
    })
}
  getDataById(id): Observable<Setty>{
    const d = doc(this.firestore, `workouts/${id}`);
    return docData(d, {idField: 'id'}) as Observable<Setty>;
  }

  add_set(set: Setty, date){
    setDoc(doc(this.firestore, date, (set.Excercise + " " + set.Set.toString())), {
      Excercise: set.Excercise,
      Set: set.Set,
      Reps: set.Reps,
      Weight: set.Weight
    }, {merge: true} );
    console.log("Add_set in fb is being called...");
  }

  deleteDate(id, key){
    this.db.collection(key).doc(id).delete();
  }
}
