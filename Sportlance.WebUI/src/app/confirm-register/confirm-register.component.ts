import {Component} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ConfirmRegistrationRequest} from '../auth/requests/confirm-registration-request';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'sl-confirm-register',
  templateUrl: './confirm-register.component.html',
  styleUrls: ['./confirm-register.component.scss']
})
export class ConfirmRegisterComponent {

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(async (params: Params) => {
      this.authService.confirmEmail(<ConfirmRegistrationRequest>{
        token: params['token'],
        userId: params['id']
      }).subscribe();
    });
  }
}
