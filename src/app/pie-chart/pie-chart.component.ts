import { Component } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})

export class PieChartComponent {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public pieChartColors = [
    {
      backgroundColor: ['red', 'green', 'blue']
    },
  ]
  public userArray: Data[] = [];
  constructor(private http: HttpClient) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.pieChartData=[];
    this.pieChartLabels=[];
    
    
    this.http.get('assets/csv.csv', {responseType: 'text'})
    .subscribe(
        data => {
            let csvToRowArray = data.split("\n");
            for (let index = 1; index < csvToRowArray.length - 1; index++) {
              let row = csvToRowArray[index].split(",");
              this.userArray.push(new Data( parseInt( row[0], 10), row[1]));
            }
            console.log(this.userArray);
            this.userArray.forEach((currentElement, index) => { 
              addValue(currentElement,this.pieChartData,this.pieChartLabels)/* ... */ })
        },
        error => {
            console.log(error);
        }
    );
  }

}
export class Data{
  value: number;
  label: String;

  constructor(value: number, label: String){
    this.value = value;
    this.label = label;
  }
}
function addValue(data,pieChartData,pieChartLabels) {
  console.log(data)
  pieChartData.push(parseInt(data.value));
  pieChartLabels.push([data.label]);
}

