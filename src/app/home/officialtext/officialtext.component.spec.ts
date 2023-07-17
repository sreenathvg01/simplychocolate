import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialtextComponent } from './officialtext.component';

describe('OfficialtextComponent', () => {
  let component: OfficialtextComponent;
  let fixture: ComponentFixture<OfficialtextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfficialtextComponent]
    });
    fixture = TestBed.createComponent(OfficialtextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
