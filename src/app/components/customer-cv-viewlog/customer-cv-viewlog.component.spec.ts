import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCvViewlogComponent } from './customer-cv-viewlog.component';

describe('CustomerCvViewlogComponent', () => {
  let component: CustomerCvViewlogComponent;
  let fixture: ComponentFixture<CustomerCvViewlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerCvViewlogComponent]
    });
    fixture = TestBed.createComponent(CustomerCvViewlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
