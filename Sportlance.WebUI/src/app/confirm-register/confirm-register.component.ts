import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Paths} from '../core/paths';
import {AuthApiClient} from '../services/auth/auth-api-client';
import {ConfirmRegistrationRequest} from '../services/auth/requests/confirm-registration-request';
import {UserService} from '../services/user.service/user.service';

@Component({
  selector: 'app-confirm-register',
  templateUrl: './confirm-register.component.html',
  styleUrls: ['./confirm-register.component.scss']
})
export class ConfirmRegisterComponent {

  constructor(private authClient: AuthApiClient,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router) {
    this.activatedRoute.params.subscribe(async (params: Params) => {
      this.authClient.confirmEmail(<ConfirmRegistrationRequest>{
        token: params['token'],
        userId: params['id']
      }).subscribe((response) => {
        this.userService.saveToken(response.token);
        this.router.navigate([Paths.Root]);
      });
    });
  }
}
