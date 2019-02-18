import {Component, Input, OnInit} from '@angular/core';
import {TrainerResponse} from '../../../shared/trainers/responses/trainer-response';

@Component({
  selector: 'sl-trainer-skills-collection',
  templateUrl: './trainer-skills-collection.component.html',
  styleUrls: ['./trainer-skills-collection.component.scss']
})
export class TrainerSkillsCollectionComponent implements OnInit {

  @Input() trainer: TrainerResponse;

  tempSkills = [];

  constructor() {
  }

  ngOnInit() {
    this.tempSkills = [
      'Плавание',
      'Кикбоксинг',
      'Качалка',
      'Восстановление',
      'Тренировки',
      'Борьба',
      'Айкидо',
      'Карате',
      'Вольная стрельба',
      'Баскетбол',
      'Волейбол',
      'Плавание',
      'Плавание',
      'Плавание',
      'Плавание',
      'Плавание'
    ];
  }
}
