import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VakumComponent } from './vakum.component';

describe('VakumComponent', () => {
  let component: VakumComponent;
  let fixture: ComponentFixture<VakumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VakumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VakumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
