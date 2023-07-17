import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallChocolatesComponent } from './small-chocolates.component';

describe('SmallChocolatesComponent', () => {
  let component: SmallChocolatesComponent;
  let fixture: ComponentFixture<SmallChocolatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmallChocolatesComponent]
    });
    fixture = TestBed.createComponent(SmallChocolatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
