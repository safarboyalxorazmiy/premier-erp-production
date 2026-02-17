import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckRemontComponent } from './check-remont.component';

describe('CheckRemontComponent', () => {
  let component: CheckRemontComponent;
  let fixture: ComponentFixture<CheckRemontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckRemontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckRemontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
