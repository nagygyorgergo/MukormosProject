import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
          worker_name: [this.reservationRef.worker_name],
          email: [this.reservationRef.email],
          timestamp: [this.reservationRef.timestamp],
          service: [this.reservationRef.service]
        })
      })
  }

  onSubmit(){
    const id = this.act.snapshot.paramMap.get('id');

    this.reservationService.updateRes(this.editForm.value, id);
    this.router.navigate(['list-reservations']);
  }

}