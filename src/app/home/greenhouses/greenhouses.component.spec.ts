import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenhousesComponent } from './greenhouses.component';

describe('GreenhousesComponent', () => {
  let component: GreenhousesComponent;
  let fixture: ComponentFixture<GreenhousesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GreenhousesComponent]
    });
    fixture = TestBed.createComponent(GreenhousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
