import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private afAuth: AngularFireAuth, 
              private router: Router) { }

public canActivate(){
  return this.afAuth.authState.pipe(map((user)=>{
      if (user) return true;
      else {
        this.router.navigate(['login']);
        return false
      }
    }
    ),
    first(),
    )
  }
}
