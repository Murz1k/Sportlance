import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Paths} from '../../paths';
import {AuthApiClient} from '../../services/auth-api-client';
import {ConfirmRegistrationRequest} from '../../services/confirm-registration-request';

@Component({
  selector: 'app-confirm-register',
  templateUrl: './confirm-register.component.html',
  styleUrls: ['./confirm-register.component.css']
})
export class ConfirmRegisterComponent {

  constructor(private authClient: AuthApiClient,
              private activatedRoute: ActivatedRoute,
              //private notifyService: NotifyService,
              //public txt: TxtService,
              //private accountService: AccountService,
              private router: Router) {

    activatedRoute.params.subscribe(async (params: Params) => {

      await authClient.confirmEmailAsync(<ConfirmRegistrationRequest>{token: params['token'], userId: params['id']});
      //data => {
      //this.notifyService.success(this.txt.registrationConfirmation.success)
      //this.accountService.login(data);
      this.router.navigate([Paths.Root])
      //},
      //err => {
      //this.notifyService.success(this.txt.registrationConfirmation.fail)
      // }
    });

  }
}
