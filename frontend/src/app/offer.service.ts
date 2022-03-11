import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000";

  createPriceOffer(estate: string, bidder: string, price: number) {
    const data = {
      estate: estate,
      bidder: bidder,
      active: false,
      approved: false,
      price: price,
      renting: false,
      to: null,
      from: null
    }

    return this.http.post(`${this.uri}/offer/createOffer`, data);
  }

  createRentOffer(estate: string, bidder: string, price: number, to: Date, from: Date) {
    const data = {
      estate: estate,
      bidder: bidder,
      approved: false,
      active: false,
      price: price,
      renting: true,
      to: to,
      from: from
    }
    return this.http.post(`${this.uri}/offer/createOffer`, data);
  }

  getAllOffersFromEstate(estate: string) {
    const data = {
      estate: estate
    };
    return this.http.post(`${this.uri}/offer/getAllOffersFromEstate`, data);
  }

  deleteOtherOffers(estate: string) {
    const data = {
      estate: estate
    };

    return this.http.post(`${this.uri}/offer/deleteOtherOffers`, data);
  }

  checkIfUserReserved(username, estate) {
    const data = {
      user: username,
      estate: estate
    };

    return this.http.post(`${this.uri}/offer/checkIfUserReserved`, data);
  }

  acceptOffer(bidder: string, estate: string) {
    const data = {
      bidder: bidder,
      estate: estate
    };

    return this.http.post(`${this.uri}/offer/acceptOffer`, data);
  }

  declineOffer(bidder, estate) {
    const data = {
      bidder: bidder,
      estate: estate
    };

    return this.http.post(`${this.uri}/offer/declineOffer`, data);
  }

  getActiveOfferFromUser(bidder, estate) {
    const data = {
      bidder: bidder,
      estate: estate
    };

    return this.http.post(`${this.uri}/offer/getActiveOfferFromUser`, data);
  }

  getAllNotAcceptedOffersFromEstate(estate) {
    const data = {
      estate: estate
    };

    return this.http.post(`${this.uri}/offer/getAllNotAcceptedOffersFromEstate`, data);
  }

  deleteMultipleOffers(index: number[]) {
    const data = {
      ids: index
    };

    return this.http.post(`${this.uri}/offer/deleteMultipleOffers`, data);
  }

  getAllNotApprovedOffers() {
    return this.http.get(`${this.uri}/offer/getAllNotApprovedOffers`);
  }

  approveOffer(id) {
    const data = {
      id: id
    };

    return this.http.post(`${this.uri}/offer/approveOffer`, data);
  }

  checkIfOfferActive(address) {
    const data = {
      address: address
    };

    return this.http.post(`${this.uri}/offer/checkIfOfferActive`, data);
  }

  getApprovedOffers() {
    return this.http.get(`${this.uri}/offer/getApprovedOffers`);
  }

  discardOffer(id) {
    const data = {
      id: id
    };

    return this.http.post(`${this.uri}/offer/discardOffer`, data);
  }
}
