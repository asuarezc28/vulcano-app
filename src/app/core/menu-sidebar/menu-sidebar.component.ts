import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd, NavigationStart, NavigationError } from '@angular/router';
import { AppUrls } from 'src/app/config/app-urls.config';
import { SidebarMenuService } from '../../services/sidebar-menu-service/sidebar-menu.service'
import { Link } from '../models/link.model';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.css']
})
export class MenuSidebarComponent implements OnInit {

  show: boolean = false;
  links: Link[] = [];
  eventRoute: boolean = false;


  constructor(private SidebarService: SidebarMenuService,
    private router: Router) { }

  ngOnInit(): void {
    this.links.push(new Link('Local', AppUrls.AppLocalProductList, 'tested'));
    this.links.push(
      new Link(
        'Trails',
        AppUrls.AppWalkingTrails,
        'test'
      )
    );


    this.SidebarService.sidebarViewChange$.subscribe(changeShow => {
      if (this.show === false){
        this.show = true; 
      } else{
        this.show = changeShow;
      }
    })
  }


  sendInfo() {
    this.router.events.subscribe((event: Event) => {
   if (event instanceof NavigationStart) {
       this.eventRoute = true;
    }
    });
    if (this.eventRoute === true) {
      this.SidebarService.sidebarViewChange$.emit(true);
      this.eventRoute = false; 
    }
    else {
      this.SidebarService.sidebarViewChange$.emit(false);
    }
  }
}
