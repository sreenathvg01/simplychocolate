import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinPacksComponent } from './protein-packs.component';

describe('ProteinPacksComponent', () => {
  let component: ProteinPacksComponent;
  let fixture: ComponentFixture<ProteinPacksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProteinPacksComponent]
    });
    fixture = TestBed.createComponent(ProteinPacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
