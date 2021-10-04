import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualsModule } from './visuals/visual.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [],
  providers: [],
  imports: [
    CommonModule,
    VisualsModule,
    NgbModule
  ],
  exports: [
    VisualsModule,
    NgbModule,
  ]
})
export class SharedModule { }