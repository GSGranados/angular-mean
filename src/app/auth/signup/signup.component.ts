import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading:boolean = false;
  private authStatusSub: Subscription;
  constructor(public authService:AuthService, public router:Router) { }

  ngOnInit(): void {
  this.authStatusSub = this.authService.getAuthStatusListener().subscribe((authStatus)=>{
      this.isLoading = false;
    });
  }

  onSignup(signUpForm: NgForm){
    if(signUpForm.invalid){
      return console.log('esto es invalido')
    }else{
      this.isLoading=true;
      this.authService.createUser(signUpForm.value.email, signUpForm.value.password);
    }
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }

}
