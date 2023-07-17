import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPopupComponent } from './top-popup.component';

describe('TopPopupComponent', () => {
  let component: TopPopupComponent;
  let fixture: ComponentFixture<TopPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopPopupComponent]
    });
    fixture = TestBed.createComponent(TopPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
