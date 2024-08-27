import { Component, OnInit,Input,ViewChild } from '@angular/core';
import { financialItem } from '../../financialItem';

import { NgFor,DecimalPipe, NgIf } from '@angular/common';
import { UUID } from "crypto";
import { ReportingService } from '../../reporting.service';

import { StatementDatesComponent } from "../statement-dates/statement-dates.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

/*Testing Material*/
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field'; 

import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-reporting',
  standalone: true,
  imports: [NgFor,NgIf,StatementDatesComponent,DecimalPipe,MatSidenavModule,MatFormFieldModule,MatInputModule,FormsModule],
  templateUrl: './reporting.component.html',
  styleUrl: './reporting.component.css'
})



export class ReportingComponent implements OnInit  {
  @ViewChild(StatementDatesComponent) StatementDatesComponent: any;


  financialItems: financialItem[] =[];
  deletedItems: any[] = [];
  createdItems: Set<UUID> = new Set();
  toggle = false; 
  focusItem?: financialItem;

  constructor(private reportingService: ReportingService) {}

  bringInNotes(currentItem:financialItem,event: FocusEvent ): void
  {
    this.toggle = true;
    this.focusItem =currentItem;
  }
  colapseNotes(): void
  {
    this.toggle = false;
    this.focusItem = undefined;
  }

  createNewStatement(): void
  {
    this.reportingService.createNewStatement().subscribe(dates => this.StatementDatesComponent.inputDates(dates)) 
  }

  deleteStatement(): void
  {
    this.reportingService.deleteStatement(this.StatementDatesComponent.currentDate).subscribe(dates => this.StatementDatesComponent.inputDates(dates)) 
  }


  addItem(item:financialItem)
  {
    let spot = item.itemOrder+1
    let startingAmount = 0
    if(item.treeHeight >= this.financialItems[item.itemOrder+1].treeHeight)
    { 
      startingAmount = item.amount  
    }
    //create new item
    this.financialItems = [
        ...this.financialItems.slice(0, spot),
        { id: crypto.randomUUID(),as_of_date: this.StatementDatesComponent.currentDate, item: "",amount: startingAmount,treeHeight: item.treeHeight+1,parent:item.id,itemOrder :spot,notes:"" },
        ...this.financialItems.slice(spot)
    ];
    this.createdItems.add(this.financialItems[spot].id)
    //update itemOrder for other items
    spot ++
    while (spot != this.financialItems.length)
    {
      this.financialItems[spot].itemOrder = spot
      spot = spot+1
    }

  }
  removeItem(item:financialItem)
  {
    if(!this.createdItems.has(item.id)){
      this.deletedItems.push({'id':item.id})
      this.createdItems.delete(item.id)
    }
    this.propagateAmounts(item, -item.amount)
    let spot = item.itemOrder
    this.financialItems.splice(item.itemOrder, 1);
    while (spot != this.financialItems.length)
    {
      this.financialItems[spot].itemOrder = spot
      spot = spot+1
    }
  }
  
  updateAmount(updateItem:financialItem,event: FocusEvent ) {
    if( Number( (<HTMLInputElement>event.target).value.replace(/,/g, '')) || (<HTMLInputElement>event.target).value == "0")
    {
      if (updateItem.amount !== Number( (<HTMLInputElement>event.target).value.replace(/,/g, '')) ) 
      {
        let newAmount = Number( (<HTMLInputElement>event.target).value.replace(/,/g, ''))
        let oldAmount = updateItem.amount
        updateItem.amount =newAmount 
        this.propagateAmounts(updateItem,newAmount-oldAmount)
      }
    }
    else
    {
      console.log("Not a number")
      //Mark red
    }
  }

  updateName(updateItem:financialItem,event: FocusEvent ) {
    if(updateItem.treeHeight != 0)
    {
      let name = (<HTMLInputElement>event.target).value
      updateItem.item =name 
    }
  }


  propagateAmounts(item:financialItem,absValue:number)
  {
    const parent = this.financialItems.find(fi => fi.id === item.parent)!;
    let oldAmount = parent.amount
    let newAmount = oldAmount + absValue
    let newAbsValue = newAmount-oldAmount
    parent.amount = newAmount
    if(parent.treeHeight==0)
    {
      if(parent !==  this.financialItems[0])
      {
        newAbsValue= newAbsValue *-1
      }
      this.financialItems[this.financialItems.length -1].amount = this.financialItems[this.financialItems.length -1].amount  + newAbsValue
    }
    else
    {
      this.propagateAmounts(parent,newAbsValue)
    }
  }

  saveChanges(): void{
    this.reportingService.save_statement([this.financialItems,this.deletedItems])
    this.deletedItems=[]
    this.createdItems.clear()
  }


  getItems(dateString?:string): void {
    this.reportingService.getItems(dateString)
        .subscribe(items => this.financialItems = items)
  }

  ngOnInit(): void {
    this.getItems()
  }

}
