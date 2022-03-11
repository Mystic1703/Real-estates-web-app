import { Component, OnInit } from '@angular/core';
import { EstateService } from '../estate.service';
import { Estate } from '../models/estate';
import { Offer } from '../models/offer';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-approved-offers',
  templateUrl: './approved-offers.component.html',
  styleUrls: ['./approved-offers.component.css']
})
export class ApprovedOffersComponent implements OnInit {

  constructor(private offerService: OfferService, private estateService: EstateService) { }

  ngOnInit(): void {
    this.getOffers();
    //this.getEstates();
    this.percentRenting = parseInt(localStorage.getItem("percentRenting")) / 100;
    this.percentSelling = parseInt(localStorage.getItem("percentSelling")) / 100;
    //this.income = this.calculateIncome();
  }

  estates: Estate[] = [];
  offers: Offer[] = [];
  ownerMap = new Map();
  income: number;
  percentRenting: number = 0.2;
  percentSelling: number = 0.1;

  getOffers() {
    this.offerService.getApprovedOffers().subscribe((allOffers: Offer[]) => {
      this.offers = allOffers;
      this.estateService.getAllEstates().subscribe((allEstates: Estate[]) => {
        this.estates = allEstates;
        for (let i = 0; i < allEstates.length; i++) {
          this.ownerMap.set(allEstates[i].address, allEstates[i].owner);
        }
      })
    })
  }

  calculateIncome() {
    let num: number = 0;
    for (let offer of this.offers) {
      if (this.ownerMap.get(offer.estate) == "agency") {
        num += offer.price;
      } else {
        if (offer.renting) {
          num += (offer.price * this.percentRenting);
        } else {
          num += (offer.price * this.percentSelling);
        }
      }
    }
    return num;
  }

  getPrettyDate(d: string) {
    let date = new Date(d);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1);
    let day = date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate();
    return day + "/" + month + "/" + year;
  }

}
