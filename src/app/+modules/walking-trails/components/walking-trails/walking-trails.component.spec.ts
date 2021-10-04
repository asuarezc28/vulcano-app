import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkingTrailsComponent } from './walking-trails.component';

describe('WalkingTrailsComponent', () => {
  let component: WalkingTrailsComponent;
  let fixture: ComponentFixture<WalkingTrailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalkingTrailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkingTrailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
