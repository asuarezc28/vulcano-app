import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUrls } from 'src/app/config/app-urls.config';

@Component({
  selector: 'app-local-product-detail',
  templateUrl: './local-product-detail.component.html',
  styleUrls: ['./local-product-detail.component.css']
})
export class LocalProductDetailComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  goToBackPage() {
    this.router.navigate([AppUrls.AppLocalProductList]);
  }


}
