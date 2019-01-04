import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'sl-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  userName: string;

  selectedSlide: number = 0;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.userName = this.activatedRoute.snapshot.data['user'].firstName;
  }

  preview() {
    this.selectedSlide--;
  }

  next() {
    this.selectedSlide++;
  }
}
