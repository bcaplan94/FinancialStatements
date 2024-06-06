import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { financialItem } from './financialItem';

import { HttpClientModule } from "@angular/common/http";
import { enableProdMode, importProvidersFrom } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";

import { AppComponent } from "./app.component";




@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  private financialReportingURL = 'http://127.0.0.1:5000/api/items';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getItems(dateString?:string): Observable<financialItem[]> {
        let dateParam = dateString===undefined? undefined : new HttpParams().set("as_of_date", dateString); //Create new HttpParams
        return this.http.get<financialItem[]>(this.financialReportingURL+"/get_items",{params:dateParam});
  }
  
  getDates(): Observable<Date[]> {
    return this.http.get<Date[]>(this.financialReportingURL+"/get_dates");
  }

  createNewStatement(): Observable<Date[]> {
    return this.http.get<Date[]>(this.financialReportingURL+"/create_new_statement");
  }

  deleteStatement(dateString:string): Observable<Date[]> {
    let dateParam = new HttpParams().set("as_of_date", dateString);
    return this.http.delete<Date[]>(this.financialReportingURL+"/delete_statement",{params:dateParam});
  }

  save_statement(items: any){
    return this.http.put<any>(this.financialReportingURL+"/save_statement", items, this.httpOptions).subscribe(data => console.log(data));
  }

  getComparison(dateString1?:string,dateString2?:string): Observable<any[]> {
    let dateParam = dateString1===undefined || dateString2===undefined? undefined : new HttpParams().set("date1", dateString1).set("date2", dateString2); //Create new HttpParams
    return this.http.get<any[]>(this.financialReportingURL+"/compare",{params:dateParam});
}
  /*getItems(): financialItem[] {
    return this.FINANCIALITEMS
  }*/

  
  constructor( private http: HttpClient  ) { 

  }
}
