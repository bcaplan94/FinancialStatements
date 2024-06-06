import { Routes } from '@angular/router';


import { HomeComponent } from "./components/home/home.component";
import { ReportingComponent } from "./components/reporting/reporting.component";
import { ItemCompareComponent } from "./components/item-compare/item-compare.component";

export const routes: Routes = [
    { path: "",component: HomeComponent},
    { path: "reporting",component: ReportingComponent},
    { path: "compare",component: ItemCompareComponent},
    { path: "**",redirectTo: ""}
];
