import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstateService {

  uri = "http://localhost:4000";
  constructor(private http: HttpClient) { }

  getFilteredEstates(lowerPrice: string, upperPrice: string, city: string) {
    const data = {
      "lowerPrice": lowerPrice,
      "upperPrice": upperPrice,
      "city": city
    };

    return this.http.post(`${this.uri}/estate/getFilteredEstates`, data);
  }


  getAllNotPromotedEstates() {
    return this.http.get(`${this.uri}/estate/getAllNotPromotedEstates`);
  }

  getAllPromotedEstates() {
    return this.http.get(`${this.uri}/estate/getAllPromotedEstates`);
  }

  getAllEstates() {
    return this.http.get(`${this.uri}/estate/getAllEstates`);
  }

  findEstate(title) {
    const data = {
      description: title
    };

    return this.http.post(`${this.uri}/estate/findEstate`, data);
  }

  uploadPicture(picture: FormData) {
    return this.http.post(`${this.uri}/estate/uploadPicture`, picture);
  }

  addNewEstate(description: string, city: string, region: string,
    address: string, price: string, floor: string, maxFloor: string,
    size: string, fitted: string, rented: string, pictures: number,
    owner: string, rooms: string, type: string) {

    let isFitted = (fitted == "yes");
    let isRented = (rented == "yes");
    let sizeNumber = parseInt(size);
    let priceNumber = parseInt(price);
    let floorNumber = parseInt(floor);
    let maxFloorNumber;
    if (type == "house") {
      maxFloorNumber = null;
    } else {
      maxFloorNumber = parseInt(maxFloor);
    }
    let approved: boolean;
    let sold: boolean;
    if (owner == "agency") approved = true;
    else approved = false;
    if (isRented) sold = null;
    else sold = false;
    const data = {
      description: description,
      city: city,
      region: region,
      address: address,
      price: priceNumber,
      floor: floorNumber,
      maxFloor: maxFloorNumber,
      size: sizeNumber,
      fitted: isFitted,
      rented: isRented,
      pictures: pictures,
      owner: owner,
      rooms: rooms,
      type: type,
      approved: approved,
      sold: sold,
      promoted: false
    }
    return this.http.post(`${this.uri}/estate/addNewEstate`, data);
  }

  getAllNotApprovedEstates() {
    return this.http.get(`${this.uri}/estate/getAllNotApprovedEstates`);
  }

  approveEstate(address, description) {
    const data = {
      address: address,
      description: description
    };

    return this.http.post(`${this.uri}/estate/approveEstate`, data);
  }

  getAllEstatesFromUser(username) {
    const data = {
      username: username
    };

    return this.http.post(`${this.uri}/estate/getAllEstatesFromUser`, data);
  }

  updateEstate(newEstate) {
    const data = {
      estateData: newEstate
    };

    return this.http.post(`${this.uri}/estate/updateEstate`, data);
  }

  updatePictureNumber(address, owner, pictures) {
    const data = {
      address: address,
      owner: owner,
      pictures: pictures
    };

    return this.http.post(`${this.uri}/estate/updatePictureNumber`, data);
  }

  getAllApprovedEstates() {
    return this.http.get(`${this.uri}/estate/getAllApprovedEstates`);
  }

  updatePromotion(address, owner, promote) {
    const data = {
      address: address,
      owner: owner,
      promote: promote
    };

    return this.http.post(`${this.uri}/estate/updatePromotion`, data);
  }

  getAllRentedEstates() {
    return this.http.get(`${this.uri}/estate/getAllRentedEstates`);
  }

  getAllSellingEstates() {
    return this.http.get(`${this.uri}/estate/getAllSellingEstates`);
  }

  setSold(address) {
    const data = {
      address: address
    };

    return this.http.post(`${this.uri}/estate/setSold`, data);
  }

  deleteEstate(address) {
    const data = {
      address: address
    };

    return this.http.post(`${this.uri}/estate/deleteEstate`, data);
  }
}
