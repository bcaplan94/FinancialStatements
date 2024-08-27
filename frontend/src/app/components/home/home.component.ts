import { Component,OnInit } from '@angular/core';
import { ReportingService } from '../../reporting.service';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent implements OnInit  {

  NetWorth?: number = 0;


  constructor(private reportingService: ReportingService) {}

  getItems(dateString?:string): void {
    this.reportingService.getItems(dateString)
        .subscribe(items => this.NetWorth = items.at(-1)?.amount)
  }

  ngOnInit(): void {
    this.getItems()
  }

}
