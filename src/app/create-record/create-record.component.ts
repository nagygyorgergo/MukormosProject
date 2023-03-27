import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DateFormatPipe } from '../pipes/date-format.pipe';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.css']
})
export class CreateRecordComponent implements OnInit{

  public resForm: FormGroup;
  userUid: string |any;

  minDate = new Date();

  constructor(
    public reservationService: ReservationService,
    public formBuilder: FormBuilder,
    public router: Router,
    public afAuth: AngularFireAuth){
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
    //throw new Error('Method not implem ented.');
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userUid = user.uid;
        this.resForm.controls['user_id'].setValue(this.userUid);
      } else {
        this.userUid = null;
      }
    });
  }

  onSubmit(){
    this.reservationService.createRes(this.resForm.value);
    this.router.navigate(['list-reservations']);
  }

}
