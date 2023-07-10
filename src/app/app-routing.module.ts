import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PieChartComponent } from './pie-chart/pie-chart.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pie-chart' },
  
 
  { path: 'pie-chart', component: PieChartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
