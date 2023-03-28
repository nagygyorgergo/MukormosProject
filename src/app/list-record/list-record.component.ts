import { Component, OnInit } from '@angular/core';
import { Reservation } from '../model/reservation.model';
import { ReservationService } from '../services/reservation.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-list-record',
  templateUrl: './list-record.component.html',
  styleUrls: ['./list-record.component.css']
})
export class ListRecordComponent implements OnInit{
  reservation: any;
  userUid: string |any;

  constructor(public afAuth: AngularFireAuth,
    private reservationService: ReservationService){
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userUid = user.uid;
      } else {
        this.userUid = null;
      }
    });
  }

  ngOnInit(): void {
    this.reservationService.getResList().subscribe(res =>{
      this.reservation = res.map(e => {
        return{
          id: e.payload.doc.id,
          ...e.payload.doc.data() as{}
        } as Reservation
      })
    });
  }

  removeStudent(reservation: Reservation): void{
    if(confirm("Are you sure to delete "+reservation.worker_name)){
      this.reservationService.deleteRes(reservation);
    }    
  }

  getStudent(){
    return this.reservationService.getResList();
  }

}
