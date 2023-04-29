import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
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
    .collection('reservations-collection', ref => ref
    .orderBy('date', 'desc').orderBy('timestamp', 'desc')) 
    .snapshotChanges();
  }

  isReserved(date: number, timestamp: string): Observable<boolean> {
    return this.angularFirestore
      .collection('reservations-collection', ref => 
        ref.where('date', '==', date).where('timestamp', '==', timestamp))
      .valueChanges()
      .pipe(
        map(reservations => reservations.length > 0)
      );
  }

  /* isDateReserved(date: number): Observable<boolean> {
    return this.angularFirestore
      .collection('reservations-collection', ref => 
        ref.where('date', '==', date))
      .valueChanges()
      .pipe(
        map(reservations => reservations.length > 0)
      );
  }

  isTimestampReserved(timestamp: string): Observable<boolean> {
    return this.angularFirestore
      .collection('reservations-collection', ref => 
        ref.where('timestamp', '==', timestamp))
      .valueChanges()
      .pipe(
        map(reservations => reservations.length > 0)
      );
  } */
  
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
        service: reservation.service,
        timestamp: reservation.timestamp,
        date: reservation.date
      });
  }

  getResByService(serviceType: string){
    //return this.angularFirestore.collection("student-collection", ref =>ref.where('student_course', '==', courseId).orderBy('fees', 'desc')).valueChanges();
    //return this.angularFirestore
    //.collection('reservations-collection', ref =>ref.where('service', '==', serviceType).orderBy('timestamp', 'desc'))
    //.snapshotChanges();

    return this.angularFirestore
    .collection('reservations-collection', ref =>ref.where('service', '==', serviceType).orderBy('date', 'desc').orderBy('timestamp', 'desc'))
    .snapshotChanges();
  }
}
