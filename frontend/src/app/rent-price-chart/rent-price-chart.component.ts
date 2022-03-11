import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { EstateService } from '../estate.service';
import { Estate } from '../models/estate';
@Component({
  selector: 'app-rent-price-chart',
  templateUrl: './rent-price-chart.component.html',
  styleUrls: ['./rent-price-chart.component.css']
})
export class RentPriceChartComponent implements OnInit {

  constructor(private estateService: EstateService) { }

  ngOnInit(): void {
    this.getAllEstates();
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['<100€', '100-200€', '200-500€', '500-1000€', '>1000€'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56], label: 'Flats' },
    { data: [28, 48, 40, 19, 86], label: 'Houses' }
  ];

  estates: Estate[];

  getAllEstates() {
    this.estateService.getAllRentedEstates().subscribe((allEstates: Estate[]) => {
      this.estates = allEstates;
      this.getData();
    })
  }

  getData() {
    let numFlats: number[] = [0, 0, 0, 0, 0];
    let numHouses: number[] = [0, 0, 0, 0, 0];
    for (let e of this.estates) {
      let index: number;

      if (e.price < 100) {
        index = 0;
      } else if (e.price >= 100 && e.price < 200) {
        index = 1;
      } else if (e.price >= 200 && e.price < 500) {
        index = 2;
      } else if (e.price >= 500 && e.price < 1000) {
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
