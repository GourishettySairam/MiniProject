import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatedTicketsComponent } from './rated-tickets.component';

describe('RatedTicketsComponent', () => {
  let component: RatedTicketsComponent;
  let fixture: ComponentFixture<RatedTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatedTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
