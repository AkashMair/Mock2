import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { MyAuthService } from '../services/my-auth.service'

export interface INologyDetails {
  date:string,
  title:string,
  description:string,
  rating: number,
  userID: string
}

export interface INologyDetailsID extends INologyDetails { id: string }

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private afs:AngularFirestore, 
              private myAuth: MyAuthService) { }

  get user() {
    return this.myAuth.user
  }

  get nologyDetailsCollection() {
    return this.afs.collection('nologyDetails'
    , (ref) => {
      return ref.where('userID', '==', this.myAuth.user.uid)})
    //   .orderBy('date', 'desc')});
  }

  get nologyDetails(){
    return this.nologyDetailsCollection.snapshotChanges()
      .pipe(map(this.includeCollectionID))
  }

  get(id:string) {
    return this.nologyDetailsCollection.doc(id).get()
    .pipe(map(
      (payload) => {
        return {id:id, ...payload.data()} as INologyDetailsID;
    }
    ));
  }

  includeCollectionID(docChangeAction) {
    return docChangeAction.map((a) => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return { id, ...data};
    })
  }

  upload(nologyDetails){
   return this.nologyDetailsCollection.add(
     {userID: this.user.uid,...nologyDetails})
  }

  delete(nologyDetails:INologyDetailsID){
    return this.nologyDetailsCollection.doc(nologyDetails.id).delete();
  }

  update(nologyDetails:INologyDetailsID){
    return this.nologyDetailsCollection.doc(nologyDetails.id).update({
      date: nologyDetails.date,
      title: nologyDetails.title,
      description: nologyDetails.description,
      rating: nologyDetails.rating
    })
  }

  

}
