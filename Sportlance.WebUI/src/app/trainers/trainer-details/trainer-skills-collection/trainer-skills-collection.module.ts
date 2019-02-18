import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainerSkillsCollectionComponent} from './trainer-skills-collection.component';

@NgModule({
  declarations: [TrainerSkillsCollectionComponent],
  imports: [
    CommonModule
  ],
  exports: [TrainerSkillsCollectionComponent]
})
export class TrainerSkillsCollectionModule {
}
