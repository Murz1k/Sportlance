import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkillsEditorComponent} from './skills-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [SkillsEditorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [SkillsEditorComponent]
})
export class SlSkillsEditorModule {
}
