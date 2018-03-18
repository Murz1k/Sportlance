import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public isEmailExist: boolean;

  public email: string;
  public password: string;
  public firstName: string;
  public secondName: string;

  constructor() {
    this.isEmailExist = false;
  }

  checkUserEmail(){
    this.isEmailExist = true;
  }

  ngOnInit() {
  }
}
