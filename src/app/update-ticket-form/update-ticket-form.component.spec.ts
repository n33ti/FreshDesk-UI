import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTicketFormComponent } from './update-ticket-form.component';

describe('UpdateTicketFormComponent', () => {
  let component: UpdateTicketFormComponent;
  let fixture: ComponentFixture<UpdateTicketFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTicketFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTicketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
