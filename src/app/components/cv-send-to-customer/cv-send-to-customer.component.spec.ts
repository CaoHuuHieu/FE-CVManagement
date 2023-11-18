import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvSendToCustomerComponent } from './cv-send-to-customer.component';

describe('CvSendToCustomerComponent', () => {
  let component: CvSendToCustomerComponent;
  let fixture: ComponentFixture<CvSendToCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CvSendToCustomerComponent]
    });
    fixture = TestBed.createComponent(CvSendToCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
