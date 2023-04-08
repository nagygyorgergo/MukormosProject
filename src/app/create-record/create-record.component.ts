import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ReservationService } from '../services/reservation.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.css']
})
export class CreateRecordComponent implements OnInit{
  public resForm: FormGroup;
  userUid: string |any;
  userEmail: string | any;
  userName: string| any;

  minDate = new Date();

  newDate: number | any;
  newTimestamp: string | any;

  submitDisabled = false;

  constructor(
    public reservationService: ReservationService,
    public formBuilder: FormBuilder,
    public router: Router,
    public afAuth: AngularFireAuth,
    public userService: UserService){
      this.resForm = this.formBuilder.group({
        worker_name: [''],
        email: [''],
        date: 0,
        timestamp: [''],
        service: [''],
        user_id: []
      })
    }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        this.userUid = user.uid;
        this.resForm.controls['user_id'].setValue(this.userUid);
        this.resForm.controls['email'].setValue(this.userEmail);
        console.log("User Uid:", user.uid);

        this.userService.getUsernameById(this.userUid).subscribe(username => {
          this.userName = username;
          this.resForm.controls['worker_name'].setValue(this.userName);
        });
      } else {
        this.userEmail = null;
      } 
    });
  }

  onSubmit(date: number, timestamp: string) {
    this.submitDisabled = true; // Disable the button
  
    this.reservationService.isReserved(date, timestamp).pipe(take(1)).subscribe((reserved) => {
      if (reserved) {
        console.log('true, tartalmazza mar');
        confirm('This is already reserved.');
        this.submitDisabled = false; // Re-enable the button
      } else {
        console.log('false, nem tartalmazza');
        this.reservationService.createRes(this.resForm.value);
        this.router.navigate(['list-reservations']);
      }
    });
  }
}

  /* onSubmit(date: number, timestamp: string){
    console.log(date);
    console.log(timestamp);
    
    this.reservationService.isReserved(date, timestamp).subscribe((reserved) => {
      if (reserved) {
        console.log("true, tartalmazza mar");
        confirm("This is already reserved.");
      } else {
        console.log("false, nem tartalmazza");
        this.reservationService.createRes(this.resForm.value);
        this.router.navigate(['list-reservations']);
        
      }
    });

  }
 */

