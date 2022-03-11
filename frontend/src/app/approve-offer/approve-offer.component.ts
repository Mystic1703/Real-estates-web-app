import { Component, OnInit } from '@angular/core';
import { EstateService } from '../estate.service';
import { Offer } from '../models/offer';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-approve-offer',
  templateUrl: './approve-offer.component.html',
  styleUrls: ['./approve-offer.component.css']
})
export class ApproveOfferComponent implements OnInit {

  constructor(private offerService: OfferService, private estateService: EstateService) { }

  ngOnInit(): void {
    this.getAllOffers();
  }


  offers: Offer[];

  getAllOffers() {
    this.offerService.getAllNotApprovedOffers().subscribe((allOffers: Offer[]) => {
      this.offers = allOffers;
    })
  }

  prettyDate(stringDate: string) {
    let date = new Date(stringDate);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1);
    let day = date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate();
    return day + "/" + month + "/" + year;
  }

  approve(offer: Offer) {
    this.offerService.approveOffer(offer.id).subscribe(resp => {
      if (resp["message"] == "ok") {
        if (offer.renting) {
          this.deleteOverlapedOffers(offer);
        } else {
          this.deleteOtherOffers(offer);
        }

        this.getAllOffers();
      }
    })
  }

  discard(offer: Offer) {
    this.offerService.discardOffer(offer.id).subscribe(resp => {
      if (resp["message"] == "ok") {
        this.getAllOffers();
      }
    })
  }

  deleteOverlapedOffers(offer: Offer) {
    let start = new Date(offer.from);
    let end = new Date(offer.to);
    this.offerService.getAllNotAcceptedOffersFromEstate(offer.estate).subscribe((allOffers: Offer[]) => {
      let indexes: number[] = this.checkOverlap(start, end, allOffers);
      this.offerService.deleteMultipleOffers(indexes).subscribe(resp => {
      })
    })
  }


  checkOverlap(start: Date, end: Date, offers: Offer[]) {
    let indexes: number[] = [];
    for (let offer of offers) {
      let from = new Date(offer.from);
      let to = new Date(offer.to);
      if ((end >= from) && (start <= to))
        indexes.push(offer.id);
    }
    return indexes;
  }

  deleteOtherOffers(offer: Offer) {
    this.offerService.deleteOtherOffers(offer.estate).subscribe(resp => {
      if (resp["message"] == "ok") {
        this.estateService.setSold(offer.estate).subscribe(res => {
          if (res["message"] == "ok") {

          }
        })
      }
    })
  }
}
