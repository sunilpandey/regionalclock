import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimezoneClockComponent } from './timezone-clock.component';

describe('TimezoneClockComponent', () => {
  let component: TimezoneClockComponent;
  let fixture: ComponentFixture<TimezoneClockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimezoneClockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimezoneClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
