import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstateService } from '../estate.service';
import { Estate } from '../models/estate';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-promoted-estate',
  templateUrl: './promoted-estate.component.html',
  styleUrls: ['./promoted-estate.component.css']
})
export class PromotedEstateComponent implements OnInit {

  constructor(private estateService: EstateService,
    private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getPromotedEstates();
    this.user = this.userService.getLoggedUser();

  }
  promotedEstates: Estate[];

  getPromotedEstates() {
    this.estateService.getAllPromotedEstates().subscribe((promEstates: Estate[]) => {
      this.promotedEstates = promEstates;
    });
  }

  estateDetails(estate: Estate) {
    localStorage.setItem("estate", JSON.stringify(estate));
    this.router.navigate(["estate-detail"]);
  }

  user: User;
}
