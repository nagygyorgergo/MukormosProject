import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //collectionName = 'Users';
  collectionName = 'users-collection';

  constructor(private angularFirestore: AngularFirestore) { 

  }

  createUser(user: User){
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection("users-collection")
        .add(user)
        .then(response => {console.log(response)}, error => reject(error))
    });
  }

  getAll(){

  }

  getById(id: string){
    return this.angularFirestore.collection<User>('users-collection').doc(id).valueChanges();
  }

  update(){

  }

  delete(){

  }
}
