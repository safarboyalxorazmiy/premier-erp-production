import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemontComponent } from './remont.component';

describe('RemontComponent', () => {
  let component: RemontComponent;
  let fixture: ComponentFixture<RemontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
