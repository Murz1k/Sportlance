import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Paths} from '../core/paths';
import {AuthApiClient} from '../services/auth/auth-api-client';
import {ConfirmRegistrationRequest} from '../services/auth/requests/confirm-registration-request';
import {AccountService} from '../services/account-service';

@Component({
  selector: 'app-confirm-register',
  templateUrl: './confirm-register.component.html',
  styleUrls: ['./confirm-register.component.scss']
})
export class ConfirmRegisterComponent {

  constructor(private authClient: AuthApiClient,
              private activatedRoute: ActivatedRoute,
              private accountService: AccountService,
              private router: Router) {

    this.activatedRoute.params.subscribe(async (params: Params) => {

      const response = await this.authClient.confirmEmailAsync(<ConfirmRegistrationRequest>{
        token: params['token'],
        userId: params['id']
      });
      this.accountService.login(response);
      this.router.navigate([Paths.Root]);
    });
  }
}
