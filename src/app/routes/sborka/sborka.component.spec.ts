import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SborkaComponent } from './sborka.component';

describe('SborkaComponent', () => {
  let component: SborkaComponent;
  let fixture: ComponentFixture<SborkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SborkaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SborkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
