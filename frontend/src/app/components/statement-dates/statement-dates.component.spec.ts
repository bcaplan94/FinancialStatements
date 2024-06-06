import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementDatesComponent } from './statement-dates.component';

describe('StatementDatesComponent', () => {
  let component: StatementDatesComponent;
  let fixture: ComponentFixture<StatementDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatementDatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatementDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
