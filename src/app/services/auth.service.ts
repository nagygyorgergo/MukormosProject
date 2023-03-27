import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoggedIn: boolean;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.userLoggedIn = false;

    this.afAuth.onAuthStateChanged((user)=>{
      if(user){
        this.userLoggedIn = true;
      }
      else{
        this.userLoggedIn = false;
      }
    });
   }

   signupUser(user: any): Promise<any>{
      return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result)=>{
        let emailLover = user.email.toLowerCase();
        result.user?.sendEmailVerification();
      })
      .catch(error =>{
        console.log("Auth service signup error", error);
        if(error.code){
          return{isValid: false, message: error.message};
        }
        else{
          return;
        }
      });
   }

  
   loginUser(email: string, password: string): Promise<any>{
    return this.afAuth.signInWithEmailAndPassword(email, password)
    .then(()=>{
      console.log('Auth service: loginUser success');
    })
    .catch(error =>{
      console.log('Auth srcvice login error');
      console.log('error code: ', error.code);
      console.log('error', error);
      if(error.code){
        return{isValid: false, message: error.message};
      }
      else{
        return;
      }
    });
   }


    signup(email: string, password: string) {
      return this.afAuth.createUserWithEmailAndPassword(email, password);
    }
  
    isUserLoggedIn() {
      return this.afAuth.user;
    }

}
