import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Trainer} from "../../services/trainer";
import {TrainerService} from "../../services/trainer.service";
import {SportService} from "../../services/sport.service";
import {Sport} from "../../services/sport";

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent implements OnInit {

  currentSport: Sport;

  trainers: Array<Trainer> = [];

  constructor(private route: ActivatedRoute,
              private trainerService: TrainerService,
              private sportService: SportService) {
  }

  async ngOnInit() {
    this.currentSport = await this.sportService.getByIdAsync(+this.route.snapshot.paramMap.get('id'));
    const response = await this.trainerService.getTrainersBySportIdAsync(this.currentSport.id);
    this.trainers = response.items;
  }

}
