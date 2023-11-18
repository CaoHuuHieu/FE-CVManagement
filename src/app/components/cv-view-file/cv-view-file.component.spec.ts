import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvViewFileComponent } from './cv-view-file.component';

describe('CvViewFileComponent', () => {
  let component: CvViewFileComponent;
  let fixture: ComponentFixture<CvViewFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CvViewFileComponent]
    });
    fixture = TestBed.createComponent(CvViewFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
