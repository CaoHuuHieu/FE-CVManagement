import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvPageComponent } from './cv-page.component';

describe('CvPageComponent', () => {
  let component: CvPageComponent;
  let fixture: ComponentFixture<CvPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CvPageComponent]
    });
    fixture = TestBed.createComponent(CvPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
