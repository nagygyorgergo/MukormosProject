import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signupForm: FormGroup | any;
  firebaseErrorMessage: string | any;

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth,
    private userService: UserService){
    this.firebaseErrorMessage="";
  }

  ngOnInit(): void {
    this.afAuth.signOut();
    this.signupForm=new FormGroup({
      'displayName': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required])
    });
  }

  /*
  signup(){
    if(this.signupForm.invalid){
      return;
    }
    this.userService.createUser(this.signupForm.value);
    this.authService.signupUser(this.signupForm.value).then((result: any)=>{

      if(result==null){
        
        this.router.navigate(['/login']);
      }
      else if(result.isValid == false){
        this.firebaseErrorMessage=result.message;
      }
    }).catch(()=>{

    });
  }*/

  signup() {
    console.log(this.signupForm.value);
    this.router.navigate(['/login']);
    this.authService.signup(this.signupForm.get('email')?.value, this.signupForm.get('password')?.value).then(cred => {
      console.log(cred);
      const user: User = {
        id: cred.user?.uid as string,
        email: this.signupForm.get('email')?.value,
        username: this.signupForm.get('displayName')?.value
      };
      this.userService.createUser(user).then(_ => {
        console.log('User added successfully.');
      }).catch(error => {
        console.error(error);
      })
    }).catch(error => {
      console.error(error);
    });
  }

  /*const user: User = {
          id: result.user?.uid as string,
          email: this.signupForm.get('email')?.value,
          username: this.signupForm.get('displayName')?.value
        }
        //insert
        this.userService.create(user).then(_ =>{
          console.log('user added successfully');
        }).catch(error =>{
          console.error(error);
        })*/

}
