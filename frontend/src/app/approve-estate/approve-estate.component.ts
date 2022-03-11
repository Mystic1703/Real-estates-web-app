import { Component, OnInit } from '@angular/core';
import { EstateService } from '../estate.service';
import { Estate } from '../models/estate';
import { User } from '../models/user';

@Component({
  selector: 'app-approve-estate',
  templateUrl: './approve-estate.component.html',
  styleUrls: ['./approve-estate.component.css']
})
export class ApproveEstateComponent implements OnInit {

  constructor(private estateService: EstateService) { }

  ngOnInit(): void {
    this.getAllNotApprovedEstates();
    this.getAllApprovedEstates();
  }

  estates: Estate[];
  approvedEstates: Estate[];

  getAllNotApprovedEstates() {
    this.estateService.getAllNotApprovedEstates().subscribe((allEstates: Estate[]) => {
      this.estates = allEstates;
    })
  }

  getAllApprovedEstates() {
    this.estateService.getAllApprovedEstates().subscribe((allEstates: Estate[]) => {
      this.approvedEstates = allEstates;
    })
  }

  approveEstate(estate: Estate) {
    this.estateService.approveEstate(estate.address, estate.description).subscribe(resp => {
      if (resp["message"] == "ok") {
        this.getAllNotApprovedEstates();
        this.getAllApprovedEstates();
      }
    })
  }

  discardEstate(estate: Estate) {
    this.estateService.deleteEstate(estate.address).subscribe(resp => {
      if (resp["message"] == "ok") {
        this.getAllNotApprovedEstates();
        this.getAllApprovedEstates();
      }
    })
  }

  promote(estate: Estate) {
    this.updatePromotion(estate.address, estate.owner, true);
  }

  degrade(estate: Estate) {
    this.updatePromotion(estate.address, estate.owner, false);
  }

  updatePromotion(address, owner, promote) {
    this.estateService.updatePromotion(address, owner, promote).subscribe(resp => {
      if (resp["message"] == "ok") {
        this.getAllApprovedEstates();
      }
    })
  }

  checkAdmin() {
    let user: User;
    user = JSON.parse(localStorage.getItem("logged"));
    if (user.type == "administrator") return true;
    else return false;
  }
}
