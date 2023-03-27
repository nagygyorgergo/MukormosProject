import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Reservation } from '../model/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private angularFirestore: AngularFirestore) { }

  getResDoc(id: any){
    return this.angularFirestore
    .collection('reservations-collection')
    .doc(id)
    .valueChanges()
  }

  getResList(){
    return this.angularFirestore
    .collection('reservations-collection')
    .snapshotChanges();
  }

  createRes(reservation: Reservation){
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection("reservations-collection")
        .add(reservation)
        .then(response => {console.log(response)}, error => reject(error))
    });
  }

  deleteRes(reservation: Reservation){
    return this.angularFirestore
      .collection("reservations-collection")
      .doc(reservation.id)
      .delete();
  }

  updateRes(reservation: Reservation, id: any){
    return this.angularFirestore
      .collection("reservations-collection")
      .doc(id)
      .update({
        worker_name: reservation.worker_name,
        email: reservation.email,
        service: reservation.service,
        timestamp: reservation.timestamp
      });
  }

  getResByService(serviceType: string){
    //return this.angularFirestore.collection("student-collection", ref =>ref.where('student_course', '==', courseId).orderBy('fees', 'desc')).valueChanges();
    //return this.angularFirestore
    //.collection('reservations-collection', ref =>ref.where('service', '==', serviceType).orderBy('timestamp', 'desc'))
    //.snapshotChanges();

    return this.angularFirestore
    .collection('reservations-collection', ref =>ref.where('service', '==', serviceType).orderBy('timestamp', 'desc'))
    .snapshotChanges();
  }
}
