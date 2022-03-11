import { Component, OnInit } from '@angular/core';
import { Estate } from '../models/estate';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { EstateService } from '../estate.service';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-city-estate-chart',
  templateUrl: './city-estate-chart.component.html',
  styleUrls: ['./city-estate-chart.component.css']
})
export class CityEstateChartComponent implements OnInit {

  constructor(private estateService: EstateService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.getEstates();
  }

  estates: Estate[];

  getEstates() {
    this.estateService.getAllApprovedEstates().subscribe((allEstates: Estate[]) => {
      this.estates = allEstates;
      this.getData();
    })
  }

  getData() {
    let myMap = new Map();
    for (let e of this.estates) {
      if (myMap.has(e.city)) {
        let num = myMap.get(e.city);
        myMap.set(e.city, num + 1);
      }
      else {
        myMap.set(e.city, 1);
      }
    }
    this.pieChartLabels = [];
    this.pieChartData = [];
    for (let key of myMap.keys()) {
      this.pieChartLabels.push(key);
      this.pieChartData.push(myMap.get(key));
    }
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartData: SingleDataSet = [0, 0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
}
