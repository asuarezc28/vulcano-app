import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { SharedModule } from '../shared/shared.module';
import { MenuSidebarComponent } from './menu-sidebar/menu-sidebar.component';
import { CoreRoutingModule } from './core-routing.module';
import { SidebarContentComponent } from './sidebar-content/sidebar-content/sidebar-content.component';


@NgModule({
  declarations: [MapComponent,HeaderComponent,MenuSidebarComponent, SidebarContentComponent],
  imports: [
    SharedModule,
    CommonModule,
    CoreRoutingModule,
  ],
  exports: [MapComponent,HeaderComponent,MenuSidebarComponent, SidebarContentComponent]
})
export class CoreModule { }



