import {Component, OnInit} from '@angular/core';
import {TrainersService} from '../../trainers/trainers.service';
import {Router} from '@angular/router';
import {AuthService} from '../../core/auth/auth.service';
import {ErrorCode} from '../../core/error-code';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'sl-be-trainer',
  templateUrl: './be-trainer.component.html',
  styleUrls: ['./be-trainer.component.css']
})
export class BeTrainerComponent implements OnInit {

  constructor(private titleService: Title,
              private authService: AuthService,
              private service: TrainersService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle(`Стать тренером | Sportlance`);
  }

  beTrainer() {
    this.service.beTrainer()
      .subscribe((response) => {
        if (!response.error) {
          this.authService.saveTokens(response, true);
          this.router.navigate(['/', 'trainers', this.authService.getCurrent().id]);
        } else {
          if (response.error.code === ErrorCode.UserAlreadyHasRole) {
            this.router.navigate(['/', 'trainers', this.authService.getCurrent().id]);
          }
        }
      });
  }
}
