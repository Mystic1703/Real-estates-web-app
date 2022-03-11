import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { Estate } from '../models/estate';
import { Offer } from '../models/offer';
import { User } from '../models/user';
import { OfferService } from '../offer.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

@Component({
  selector: 'app-estate-detail',
  templateUrl: './estate-detail.component.html',
  styleUrls: ['./estate-detail.component.css']
})
export class EstateDetailComponent implements OnInit {

  constructor(private router: Router, private offerService: OfferService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.pictureNumber = 1;
    this.getEstate();
    this.user = JSON.parse(localStorage.getItem("logged"));
    this.getAllOffers();
    this.checkReserved();
  }

  checkReserved() {
    if (this.estate.sold && !this.estate.rented) {
      this.offered = true;
      this.sold = true;
      return;
    }
    this.offerService.checkIfUserReserved(this.user.username, this.estate.address).subscribe((offer: Offer) => {
      if (offer) {
        this.offered = true;
      } else {
        this.offered = false;
      }
    });
  }
  getEstate() {
    this.estate = JSON.parse(localStorage.getItem("estate"));
  }

  offered: boolean;
  sold: boolean = false;
  user: User;
  estate: Estate;
  method: string;
  from: string;
  to: string;
  offers: Offer[];
  pictureNumber: number;


  changePicture() {
    this.pictureNumber = ((this.pictureNumber + 1) % (this.estate.pictures + 1));
    if (this.pictureNumber == 0) this.pictureNumber = 1;
  }

  contact() {
    this.router.navigate(["message"]);
  }

  getAllOffers() {
    this.offerService.getAllOffersFromEstate(this.estate.address).subscribe((allOffers: Offer[]) => {
      this.offers = allOffers;
    })
  }

  checkUser() {
    let user = JSON.parse(localStorage.getItem("logged"));
    if (user) {
      if (user.username != this.estate.owner) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  createOffer() {
    if (this.estate.rented) {
      let price = 0;
      let dateStart = new Date(this.from);
      let dateEnd = new Date(this.to);
      if (this.checkOverlap(dateStart, dateEnd)) {
        Swal.fire("Error", "Estate is rented in selected period", "error");
        return;
      }
      let difference = dateEnd.getTime() - dateStart.getTime();
      if (difference <= 0) {
        Swal.fire("Error", "End rent date can't be before start rent date", "error");
        return;
      }
      difference /= (1000 * 3600 * 24);
      difference /= 30;
      difference = Math.floor(difference + 1);
      price = this.estate.price * difference;
      this.offerService.createRentOffer(this.estate.address, this.user.username, price, dateEnd, dateStart).subscribe(resp => {
        if (resp["message"] == "ok") {
          this.messageService.addNewMessage("Hello, I'm interested about this estate. I sent you an offer",
            this.user.username, this.estate.owner, new Date(), this.estate.address, this.estate.description).subscribe(resp => {
              if (resp["message"] == "message sent") {
                this.checkReserved();
              }
            })
        }
      })
    } else {
      let price = this.estate.price;
      if (this.method == "loan") price *= 1.2;
      this.offerService.createPriceOffer(this.estate.address, this.user.username, price).subscribe(resp => {
        if (resp["message"] == "ok") {
          this.messageService.addNewMessage("Hello, I'm interested about this estate. I sent you an offer",
            this.user.username, this.estate.owner, new Date(), this.estate.address, this.estate.description).subscribe(resp => {
              if (resp["message"] == "message sent") {
              }
              this.checkReserved();
            })
        }
      })
    }
  }

  checkOverlap(start: Date, end: Date) {
    for (let offer of this.offers) {
      let from = new Date(offer.from);
      let to = new Date(offer.to);
      if ((end >= from) && (start <= to))
        return true;
    }
    return false;
  }
}
