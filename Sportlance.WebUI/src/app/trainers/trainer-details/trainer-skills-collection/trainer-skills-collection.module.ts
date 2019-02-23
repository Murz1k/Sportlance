import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainerSkillsCollectionComponent} from './trainer-skills-collection.component';
import {SlButtonModule} from '../../../shared/button/button.module';
import {AddSkillsDialogComponent} from './add-skills-dialog/add-skills-dialog.component';
import {SlInputModule} from '../../../shared/input/input.module';
import {FormsModule} from '@angular/forms';
import {SlSkillsEditorModule} from '../../../shared/skills-editor/skills-editor.module';

@NgModule({
  declarations: [TrainerSkillsCollectionComponent, AddSkillsDialogComponent],
  imports: [
    CommonModule,
    SlButtonModule,
    FormsModule,
    SlInputModule,
    SlSkillsEditorModule
  ],
  exports: [TrainerSkillsCollectionComponent],
  entryComponents: [AddSkillsDialogComponent]
})
export class TrainerSkillsCollectionModule {
}
