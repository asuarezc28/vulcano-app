import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUrls } from 'src/app/config/app-urls.config';
import { SidebarMenuService } from 'src/app/services/sidebar-menu-service/sidebar-menu.service';

@Component({
  selector: 'app-walking-trails',
  templateUrl: './walking-trails.component.html',
  styleUrls: ['./walking-trails.component.css']
})
export class WalkingTrailsComponent implements OnInit {

  show: boolean = false;


  constructor(private SidebarService: SidebarMenuService,
    private router: Router) { }

  ngOnInit(): void {
    this.SidebarService.sidebarViewChange$.subscribe(changeShow => {
      this.show = !this.show;
    })
  }


  goToDetail() {
    this.router.navigate([AppUrls.AppWalkingTrails, 'detailw']);
  }


}
