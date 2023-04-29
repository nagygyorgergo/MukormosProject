import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.css']
})
export class EditRecordComponent implements OnInit{
  public editForm: FormGroup | any;
  reservationRef: any;
  minDate = new Date();

  newDate: any;
  newTimestamp: any;

  submitDisabled = false;

  constructor(
    public reservationService: ReservationService,
    public formBuilder: FormBuilder,
    private act: ActivatedRoute,
    private router: Router) {
      this.editForm = this.formBuilder.group({
        worker_name: [''],
        email: [''],
        date: [''],
        timestamp: [''],
        service: [''],
      })
    }

  ngOnInit(): void {
    const id = this.act.snapshot.paramMap.get('id');
      this.reservationService.getResDoc(id).subscribe((res: any) =>{
        this.reservationRef = res;
        if(res!==null){
          this.newTimestamp = res.timestamp;
        }
      
        this.editForm = this.formBuilder.group({
          date: [res.date],
          timestamp: [res.timestamp],
          service: [res.service]
        })
      })
  }
 
  onSubmit(date: number, timestamp: string){
    const id = this.act.snapshot.paramMap.get('id');
    console.log("timestamp "+ timestamp);

    if (!date || !timestamp) {
     console.log('Invalid date or timestamp');
     confirm('No valid data give.');
      return;
    }

    this.reservationService.isReserved(date, timestamp).pipe(take(1)).subscribe((reserved) => {
      if (reserved) {
        console.log('true, tartalmazza mar');
        confirm('This is already reserved.');
        //this.submitDisabled = false; // Re-enable the button
      } else {
        console.log('false, nem tartalmazza');
        this.reservationService.updateRes(this.editForm.value, id);
        this.router.navigate(['dashboard']);
      }
    });
    
  
    /* let isReserved1: boolean;
    this.reservationService.isDateReserved(date).pipe(take(1)).subscribe((reserved) => {
      if (reserved) {
        isReserved1 = true;
      } else {
        isReserved1 = false;
      }
    });
    this.reservationService.isTimestampReserved(timestamp).pipe(take(1)).subscribe((reserved) => {
      if (reserved && (isReserved1 === true)) {
        console.log('true, tartalmazza mar');
        confirm('This is already reserved.');
      } else {
        console.log('false, nem tartalmazza');
        this.reservationService.updateRes(this.editForm.value, id);
        this.router.navigate(['dashboard']);
      }
    }); */

  } 

}
