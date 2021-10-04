import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocalProductListComponent } from './components/local-product-list/local-product-list.component'
import { SharedModule } from 'src/app/shared/shared.module';
import { LocalProductDetailComponent } from './components/local-product-detail/local-product-detail.component';
// import { VisualsModule } from 'src/app/shared/visuals/visuals.module';

//Because is the "local-product" page  ----> "RouterModule.forChild(["   in imports 

@NgModule({
  declarations: [LocalProductListComponent, LocalProductDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LocalProductListComponent
      },
      {
        path: 'detail',
        component: LocalProductDetailComponent
      }
    ]),
    SharedModule,
    // VisualsModule
  ],
  exports: [
    
  ]
})

export class LocalProductModule { }