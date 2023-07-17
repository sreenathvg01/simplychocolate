import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopheaderhoverItemsComponent } from './topheaderhover-items.component';

describe('TopheaderhoverItemsComponent', () => {
  let component: TopheaderhoverItemsComponent;
  let fixture: ComponentFixture<TopheaderhoverItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopheaderhoverItemsComponent]
    });
    fixture = TestBed.createComponent(TopheaderhoverItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
