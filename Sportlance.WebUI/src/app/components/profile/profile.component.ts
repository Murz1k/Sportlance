import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Trainer} from '../../services/trainer';
import {TrainerService} from "../../services/trainer.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  trainer: Trainer;
  isRendering = false;

  constructor(private route: ActivatedRoute,
              private trainerService: TrainerService) {
  }

  async ngOnInit() {
    await this.route.params.forEach(async params => {
      await this.updateDataAsync(params['id']);
    });
  }

  async updateDataAsync(id: number) {
    this.isRendering = false;
    this.trainer = await this.trainerService.getByIdAsync(id);
    this.isRendering = true;
  }
}
