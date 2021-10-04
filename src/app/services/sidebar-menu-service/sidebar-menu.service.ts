
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarMenuService {

  constructor() { }
  //Observable 
  reservation$ = new EventEmitter<object>();
  sidebarViewChange$ = new EventEmitter<boolean>();
}














