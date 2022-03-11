import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { EstateService } from '../estate.service';
import { Estate } from '../models/estate';

@Component({
  selector: 'app-flat-chart',
  templateUrl: './flat-chart.component.html',
  styleUrls: ['./flat-chart.component.css']
})
export class FlatChartComponent implements OnInit {

  constructor(private estateService: EstateService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }


  ngOnInit(): void {
    this.getEstates();
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  getEstates() {
    this.estateService.getAllApprovedEstates().subscribe((allEstates: Estate[]) => {
      this.estates = allEstates;
      this.getData();
    })
  }

  getData() {
    let numRentingFlats = 0, numRentingHouses = 0, numSellingHouses = 0, numSellingFlats = 0;
    for (let i = 0; i < this.estates.length; i++) {
      if (this.estates[i].rented) {
        if (this.estates[i].type == "flat") {
          numRentingFlats++;
        } else {
          numRentingHouses++;
        }
      } else {
        if (this.estates[i].type == "flat") {
          numSellingFlats++;
        } else {
          numSellingHouses++;
        }
      }
    }
    this.pieChartData = [numRentingHouses, numSellingHouses, numSellingFlats, numRentingFlats];
  }

  private estates: Estate[];

  public pieChartLabels: Label[] = ['Renting houses', 'Selling Houses', 'Selling flats', 'Renting flats'];
  public pieChartData: SingleDataSet = [0, 0, 0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
}
