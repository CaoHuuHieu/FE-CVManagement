import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrViewDetailComponent } from './hr-view-detail.component';

describe('HrViewDetailComponent', () => {
  let component: HrViewDetailComponent;
  let fixture: ComponentFixture<HrViewDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HrViewDetailComponent]
    });
    fixture = TestBed.createComponent(HrViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
