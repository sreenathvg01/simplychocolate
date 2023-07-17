import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderItemsComponent } from './header-items.component';

describe('HeaderItemsComponent', () => {
  let component: HeaderItemsComponent;
  let fixture: ComponentFixture<HeaderItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderItemsComponent]
    });
    fixture = TestBed.createComponent(HeaderItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
