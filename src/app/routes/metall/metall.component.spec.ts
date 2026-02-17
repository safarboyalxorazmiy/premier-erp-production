import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetallComponent } from './metall.component';

describe('MetallComponent', () => {
  let component: MetallComponent;
  let fixture: ComponentFixture<MetallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
