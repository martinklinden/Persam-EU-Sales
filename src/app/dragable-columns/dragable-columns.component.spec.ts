import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragableColumnsComponent } from './dragable-columns.component';

describe('DragableColumnsComponent', () => {
  let component: DragableColumnsComponent;
  let fixture: ComponentFixture<DragableColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragableColumnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragableColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
