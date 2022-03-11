import { Component, OnInit } from '@angular/core';
import { EstateService } from '../estate.service';
import { Estate } from '../models/estate';
import { User } from '../models/user';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private estateService: EstateService) { }

  ngOnInit(): void {
    this.getFilteredEstates();
    this.user = JSON.parse(localStorage.getItem("logged"));
    this.percentRenting = parseInt(localStorage.getItem("percentRenting"));
    if (!this.percentRenting) {
      this.percentRenting = 20;
      localStorage.setItem("percentRenting", this.percentRenting.toString());
    }
    this.percentSelling = parseInt(localStorage.getItem("percentSelling"));
    if (!this.percentSelling) {
      this.percentSelling = 10;
      localStorage.setItem("percentSelling", this.percentSelling.toString());
    }
  }

  lowerPrice: string;
  upperPrice: string;
  city: string;
  user: User;

  getFilteredEstates() {
    this.estateService.getFilteredEstates(this.lowerPrice,
      this.upperPrice, this.city).subscribe((filteredEstates: Estate[]) => {
        if (filteredEstates) {
          this.estates = filteredEstates;
        }
      })
  }


  checkUser() {
    if (!this.user) return false;
    if (this.user.type == "agent" || this.user.type == "administrator") {
      return true;
    } else {
      return false;
    }
  }

  checkAdmin() {
    if (!this.user) return false;
    if (this.user.type == "administrator") return true;
    else return false;
  }
  estates: Estate[];

  percentRenting: number;
  percentSelling: number;

  setRenting() {
    localStorage.setItem("percentRenting", this.percentRenting.toString());
  }

  setSelling() {
    localStorage.setItem("percentSelling", this.percentSelling.toString());
  }
}
