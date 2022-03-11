import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { EstateService } from '../estate.service';
import { Estate } from '../models/estate';

@Component({
  selector: 'app-buy-price-chart',
  templateUrl: './buy-price-chart.component.html',
  styleUrls: ['./buy-price-chart.component.css']
})
export class BuyPriceChartComponent implements OnInit {

  constructor(private estateService: EstateService) { }

  ngOnInit(): void {
    this.getAllEstates();
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['<50 000€', '50 000-100 000€', '100 000-250 000€', '250 000-500 000€', '>500 000€'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56], label: 'Flats' },
    { data: [28, 48, 40, 19, 86], label: 'Houses' }
  ];

  estates: Estate[];

  getAllEstates() {
    this.estateService.getAllSellingEstates().subscribe((allEstates: Estate[]) => {
      this.estates = allEstates;
      this.getData();
    })
  }

  getData() {
    let numFlats: number[] = [0, 0, 0, 0, 0];
    let numHouses: number[] = [0, 0, 0, 0, 0];
    for (let e of this.estates) {
      let index: number;

      if (e.price < 50000) {
        index = 0;
      } else if (e.price >= 50000 && e.price < 100000) {
        index = 1;
      } else if (e.price >= 100000 && e.price < 250000) {
        index = 2;
      } else if (e.price >= 250000 && e.price < 500000) {
        index = 3;
      } else {
        index = 4;
      }
      if (e.type == "flat") {
        numFlats[index]++;
      } else {
        numHouses[index]++;
      }
    }
    this.barChartData = [
      { data: numFlats, label: "Flats" },
      { data: numHouses, label: "Houses" }
    ];

  }

}
