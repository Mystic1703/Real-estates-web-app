import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estate } from '../models/estate';

@Component({
  selector: 'app-estate-card',
  templateUrl: './estate-card.component.html',
  styleUrls: ['./estate-card.component.css']
})
export class EstateCardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  @Input() estates: Estate[];

  pictureNumber: number;

  generateNumber(estate: Estate) {
    return Math.floor(Math.random() * (estate.pictures)) + 1;
  }

  estateDetails(estate: Estate) {
    localStorage.setItem("estate", JSON.stringify(estate));
    this.router.navigate(["estate-detail"]);
  }
}
