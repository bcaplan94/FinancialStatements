import { Component, OnInit,Input, Output, EventEmitter,ElementRef,ViewChild  } from '@angular/core';
import { NgFor } from '@angular/common';
import { ReportingService } from '../../reporting.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-statement-dates',
  standalone: true,
  imports: [NgFor],
  templateUrl: './statement-dates.component.html',
  styleUrl: './statement-dates.component.css'
})
export class StatementDatesComponent {

  dateList: Date[] =[];
  @Output() dateChangeEvent = new EventEmitter<string>();
	@ViewChild('dates') dateElem!: ElementRef;
  @Output() currentDate:any;
  @Input() initialSelection: number = 0;
  
  getDates(initialSelection?:number): void {
    this.reportingService.getDates()
      .subscribe(dates => this.inputDates(dates,initialSelection))  
  }
  inputDates(dates: Date[],initialSelection?:number): void{
    this.dateList= dates.map(date => new Date(date))
    if (this.dateList.length>0){
      if(initialSelection && initialSelection< this.dateList.length)
      {
        this.currentDate=this.dateList[initialSelection].toISOString().slice(0, 10)
      }
      else
      {
        this.currentDate=this.dateList[0].toISOString().slice(0, 10)
      }
    }
    this.emitChange(this.currentDate)
  }

  dateChange(event: any) {    
    this.currentDate = event.target.value+"-01"
    this.emitChange(event.target.value);
  }

  emitChange(dateValue: any)
  {
    this.dateChangeEvent.emit(dateValue);
  }
  
  
  ngOnInit(): void {
    this.getDates(this.initialSelection);
  }
  
  constructor(private reportingService: ReportingService) {}

}
