import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRegiterComponent } from './account-regiter.component';

describe('AccountRegiterComponent', () => {
  let component: AccountRegiterComponent;
  let fixture: ComponentFixture<AccountRegiterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountRegiterComponent]
    });
    fixture = TestBed.createComponent(AccountRegiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
