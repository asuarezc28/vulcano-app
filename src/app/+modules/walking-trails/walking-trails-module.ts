import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { WalkingTrailsRoutingModule } from './components/walking-trails-routing.module';
import { WalkingTrailsComponent } from './components/walking-trails/walking-trails.component';
import { WalkingTrailsDetailComponent } from './components/walking-trails-detail/walking-trails-detail.component';


@NgModule({
    declarations: [WalkingTrailsComponent, WalkingTrailsDetailComponent],
    imports: [
        CommonModule,
        WalkingTrailsRoutingModule,
        SharedModule,
    ]
})
export class WalkingTrailsModule { }