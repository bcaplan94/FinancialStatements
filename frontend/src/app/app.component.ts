import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//Might not need
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
//Might not need

import {HttpClientModule } from '@angular/common/http';


import { ReportingComponent } from "./components/reporting/reporting.component";
import { StatementDatesComponent } from "./components/statement-dates/statement-dates.component";
import { HomeComponent } from "./components/home/home.component";
import { NavigationComponent } from "./components/navigation/navigation.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterOutlet,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    NavigationComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'financial_statements';
}
