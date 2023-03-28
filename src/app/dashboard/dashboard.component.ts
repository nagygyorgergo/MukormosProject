import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../model/user.model';
import {Reservation } from '../model/reservation.model';
import { ReservationService } from '../services/reservation.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  reservation: any;
  user?: User;

  selectedValue: string |any;

  userUid: string |any;
  currentDate = new Date().getTime();

  constructor(
    private reservationService: ReservationService,
    public afAuth: AngularFireAuth,
    private userService: UserService){
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userUid = user.uid;
        } else {
          this.userUid = null;
        }
      });
      
  }
  
  ngOnInit(): void {
    
  }

  //"GnXt9K3HwcY1fZncBvh7DkhbLTz2"
  listRes(value: string){
    this.reservationService.getResByService(value).subscribe(res =>{
      this.reservation = res.map(e => {
        return{
          id: e.payload.doc.id,
          ...e.payload.doc.data() as{}
        } as Reservation
      })
    });
  }

  removeRes(reservation: Reservation): void{
    if(confirm("Are you sure to delete"+reservation.worker_name)){
      this.reservationService.deleteRes(reservation);
    }    
  }

  getRes(){
    return this.reservationService.getResList;
  }

  logout(): void{
    this.afAuth.signOut();
  }
}
