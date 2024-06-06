import { Component,OnInit,ViewChildren,QueryList} from '@angular/core';
import { NgFor,DecimalPipe } from '@angular/common';

import { ReportingService } from '../../reporting.service';
import { financialItemCompare } from '../../financialItem';
import { StatementDatesComponent } from "../statement-dates/statement-dates.component";


@Component({
  selector: 'app-item-compare',
  standalone: true,
  imports: [NgFor,StatementDatesComponent,DecimalPipe],
  templateUrl: './item-compare.component.html',
  styleUrl: './item-compare.component.css'
})
export class ItemCompareComponent implements OnInit  {
  
  @ViewChildren(StatementDatesComponent) viewChildren!: QueryList<StatementDatesComponent>;
  
  dateList: Date[] =[];
  itemList: financialItemCompare[] = [];

  constructor(private reportingService: ReportingService) {}

  dateChange(dateString:string): void {
    this.getComparison(this.viewChildren.first.currentDate,this.viewChildren.last.currentDate)
  }


  getComparison(dateString1?:string,dateString2?:string): void {
    this.reportingService.getComparison(dateString1,dateString2)
        .subscribe(items => this.itemList = items)
  }

  getPercChange(amount1?: number,amount2?: number): string
  {
    let val = '0'
    if (amount1 !== undefined && amount2 !== undefined &&  amount1 !== 0 && amount2 !== 0 )
    {
      val = ((amount2 - amount1)/amount1*100).toFixed(2)
    }
    return val
  }

  getChange(amount1: number,amount2: number): string
  {
    return (amount2 -amount1).toFixed(2)
  }

  ngOnInit(): void {
    //this.getDates()
    //this.getComparison()
  }
}
