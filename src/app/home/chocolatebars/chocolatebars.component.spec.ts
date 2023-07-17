import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChocolatebarsComponent } from './chocolatebars.component';

describe('ChocolatebarsComponent', () => {
  let component: ChocolatebarsComponent;
  let fixture: ComponentFixture<ChocolatebarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChocolatebarsComponent]
    });
    fixture = TestBed.createComponent(ChocolatebarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
