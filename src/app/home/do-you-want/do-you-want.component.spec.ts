import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoYouWantComponent } from './do-you-want.component';

describe('DoYouWantComponent', () => {
  let component: DoYouWantComponent;
  let fixture: ComponentFixture<DoYouWantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoYouWantComponent]
    });
    fixture = TestBed.createComponent(DoYouWantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
