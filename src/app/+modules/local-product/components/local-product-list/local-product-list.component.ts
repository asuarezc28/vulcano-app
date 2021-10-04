import { Component, OnInit } from '@angular/core';
import { SidebarMenuService } from '../../../../services/sidebar-menu-service/sidebar-menu.service';
import { Router } from '@angular/router';
import { AppUrls } from 'src/app/config/app-urls.config';
import { DataMapServiceService } from 'src/app/services/data-map-service/data-map-service.service';
import { delay, take } from 'rxjs/operators';
import { TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-local-product',
  templateUrl: './local-product-list.component.html',
  styleUrls: ['./local-product-list.component.css']
})
export class LocalProductListComponent implements OnInit {

  show: boolean = false;

  constructor(private SidebarService: SidebarMenuService,
    private router: Router, private DataMapServiceServiceS: DataMapServiceService) { }

  ngOnInit(): void {
    this.SidebarService.sidebarViewChange$.subscribe(changeShow => {
      this.show = !this.show;
    })

    this.DataMapServiceServiceS.bulma$.pipe(take(2))
      .subscribe(async mensaje => console.log('suelta', mensaje));
  }

  goToDetail() {
    this.router.navigate([AppUrls.AppLocalProductList, 'detail']);
  }


}


