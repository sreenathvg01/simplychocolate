import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturalProteinsComponent } from './natural-proteins.component';

describe('NaturalProteinsComponent', () => {
  let component: NaturalProteinsComponent;
  let fixture: ComponentFixture<NaturalProteinsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NaturalProteinsComponent]
    });
    fixture = TestBed.createComponent(NaturalProteinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
