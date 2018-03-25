import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../services/account-service";

@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {


  constructor(public accountService: AccountService) {
    this.accountService.initServicesAuthHeader();
  }

  ngOnInit() {
  }
}
