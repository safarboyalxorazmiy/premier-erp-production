import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogistComponent } from './logist.component';

describe('LogistComponent', () => {
  let component: LogistComponent;
  let fixture: ComponentFixture<LogistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
