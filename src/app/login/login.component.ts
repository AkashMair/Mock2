import { Component, OnInit } from '@angular/core';
import { MyAuthService } from '../services/my-auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
errorMessage='';

  constructor(private myAuth:MyAuthService, private router:Router) { }

  login(details:{email:string, password:string}){
    this.myAuth.login(details.email, details.password)
      .then(()=>this.router.navigate(['']))
      .catch((error:Error)=>this.errorMessage=error.message)
  }

  ngOnInit() {
  }

}
