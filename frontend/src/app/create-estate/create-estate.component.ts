import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstateService } from '../estate.service';
import { User } from '../models/user';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

@Component({
  selector: 'app-create-estate',
  templateUrl: './create-estate.component.html',
  styleUrls: ['./create-estate.component.css']
})
export class CreateEstateComponent implements OnInit {

  constructor(private estateService: EstateService, private router: Router) { }

  ngOnInit(): void {
  }

  description: string;
  city: string;
  region: string;
  address: string;
  type: string;
  floor: string;
  maxFloor: string;
  size: string;
  rooms: string;
  fitted: string;
  rented: string;
  price: string;
  picture: File[];

  onFileChange(event) {
    this.picture = event.target.files;
  }

  upload() {
    if (this.picture) {
      const formData = new FormData();
      for (let i = 0; i < this.picture.length; i++) {
        formData.append("estatePicture" + (i + 1), this.picture[i]);
      }
      formData.append("estate", this.address);
      formData.append("length", this.picture.length.toString());
      formData.append("startIndex", "0");
      this.estateService.uploadPicture(formData).subscribe(() => {
        Swal.fire("Success", "Estate created", "success");
        this.router.navigate(["homepage"]);
      });
    }
  }

  createEstate() {
    let user: User;
    user = JSON.parse(localStorage.getItem("logged"));
    let username = user.type == "agent" ? "agency" : user.username;
    if (!this.type) {
      Swal.fire("Error", "Enter type for an estate", "error");
      return;
    }
    if (!this.fitted) {
      Swal.fire("Error", "You need to select if your estate is fitted", "error");
      return;
    }
    if (!this.rented) {
      Swal.fire("Error", "You need to select if your estate is for renting", "error");
      return;
    }
    this.estateService.addNewEstate(this.description, this.city, this.region,
      this.address, this.price, this.floor, this.maxFloor,
      this.size, this.fitted, this.rented, this.picture.length,
      username, this.rooms, this.type).subscribe(resp => {
        if (resp["message"] == "ok") {
          this.upload();
        }
      })
  }
}
