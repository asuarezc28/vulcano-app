import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkingTrailsDetailComponent } from './walking-trails-detail.component';

describe('WalkingTrailsDetailComponent', () => {
  let component: WalkingTrailsDetailComponent;
  let fixture: ComponentFixture<WalkingTrailsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalkingTrailsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkingTrailsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
