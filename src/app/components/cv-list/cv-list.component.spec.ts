import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvListComponent } from './cv-list.component';
import { FormGroup } from '@angular/forms';

describe('CvListComponent', () => {
  let component: CvListComponent;
  let fixture: ComponentFixture<CvListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CvListComponent],
    });
    fixture = TestBed.createComponent(CvListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
