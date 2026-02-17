import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpuComponent } from './ppu.component';

describe('PpuComponent', () => {
  let component: PpuComponent;
  let fixture: ComponentFixture<PpuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PpuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
