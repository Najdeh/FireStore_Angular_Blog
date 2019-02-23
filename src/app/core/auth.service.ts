import { Injectable } from '@angular/core';
//import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  authState: any = null

  constructor(public afAuth: AngularFireAuth, private router: Router) { 
    this.afAuth.authState.subscribe(data => this.authState = data)
  }

  get authenticated(): boolean{
    return this.authState !== null
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : null
  }


  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(()=>  this.router.navigate(["/blog"]))
  }

  logout() {
    this.afAuth.auth.signOut()
  }
}
