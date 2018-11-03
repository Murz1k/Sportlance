import {Component} from '@angular/core';
import {TrainersService} from '../../trainers/trainers.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-be-trainer',
  templateUrl: './be-trainer.component.html',
  styleUrls: ['./be-trainer.component.css']
})
export class BeTrainerComponent {

  constructor(private service: TrainersService, private router: Router) {
  }

  beTranier() {
    this.service.beTrainer().subscribe(() => this.router.navigate(['/', 'trainers']));
  }
}
