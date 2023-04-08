import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({ 
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  userUid: any;
  userEmail: any;
  userName: any;
  constructor(private router: Router,
    public afAuth: AngularFireAuth,
    private userService: UserService){

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        this.userUid = user.uid;

        this.userService.getUsernameById(this.userUid).subscribe(username => {
          this.userName = username;
        });
      } else {
        this.userEmail = null;
      } 
    });
  }

  

  ngOnInit(): void {
   
  }

}
 