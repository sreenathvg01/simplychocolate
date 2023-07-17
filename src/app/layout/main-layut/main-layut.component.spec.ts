import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayutComponent } from './main-layut.component';

describe('MainLayutComponent', () => {
  let component: MainLayutComponent;
  let fixture: ComponentFixture<MainLayutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainLayutComponent]
    });
    fixture = TestBed.createComponent(MainLayutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
