import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Reservation } from '../model/reservation.model';
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
        date: 0,
        timestamp: [''],
        service: [''],
      })
    }

  ngOnInit(): void {
    const id = this.act.snapshot.paramMap.get('id');

      this.reservationService.getResDoc(id).subscribe((res: any) =>{
        this.reservationRef = res;
        this.editForm = this.formBuilder.group({
          worker_name: [res.worker_name],
          date: [res.date],
          timestamp: [res.timestamp],
          service: [res.service]
        })
      })
  }
 
  onSubmit(date: number, timestamp: string){
    const id = this.act.snapshot.paramMap.get('id');

    if (!date || !timestamp) {
      console.log('Invalid date or timestamp');
      confirm('This is already reserved, choose another timestamp and date.');
      return;
    }
    
    //this.submitDisabled = true; // Disable the button
    //var date = this.resForm.get('date')!.value;
    //var timestamp = this.resForm.get('timestamp')!.value;

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
  } 

}
