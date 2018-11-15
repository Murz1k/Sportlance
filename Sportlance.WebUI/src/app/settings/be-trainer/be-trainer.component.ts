import {Component} from '@angular/core';
import {TrainersService} from '../../trainers/trainers.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-be-trainer',
  templateUrl: './be-trainer.component.html',
  styleUrls: ['./be-trainer.component.css']
})
export class BeTrainerComponent {

  constructor(
    private authService: AuthService,
    private service: TrainersService,
    private router: Router
  ) {
  }

  beTrainer() {
    this.service.beTrainer()
      .subscribe((response) => {
        if (!response.error) {
          this.authService.saveTokens(response, true);
          this.router.navigate(['/', 'trainers']);
        }
      });
  }
}
