import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MyAuthService } from '../services/my-auth.service';
import { SessionService, INologyDetails, INologyDetailsID} from '../services/session.service';
// import { Router } from '@angular/router'



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  nologyDetails: Observable<INologyDetails>;

  constructor(private myAuth:MyAuthService, private session:SessionService) { 
    this.nologyDetails = this.session.nologyDetails;
    }

  logout(){
    this.myAuth.logout()
  }
  
  upload(nologyDetails:INologyDetails){
    this.session.upload(nologyDetails)

  }

  delete(nologyDetails: INologyDetailsID){
    this.session.delete(nologyDetails)
  }

  update(nologyDetails: INologyDetailsID){
    this.session.update(nologyDetails)
  }

  ngOnInit() {
  }

}
