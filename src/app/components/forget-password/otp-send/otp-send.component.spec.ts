import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpSendComponent } from './otp-send.component';

describe('OtpSendComponent', () => {
  let component: OtpSendComponent;
  let fixture: ComponentFixture<OtpSendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtpSendComponent]
    });
    fixture = TestBed.createComponent(OtpSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
