import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration-management',
  templateUrl: './registration-management.component.html',
  styleUrls: ['./registration-management.component.css']
})
export class RegistrationManagementComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllNotApprovedUsers();
  }

  registrations: User[];

  getAllNotApprovedUsers() {
    this.userService.getAllNotApprovedUsers().subscribe((users: User[]) => {
      this.registrations = users;
    });
  }

  approve(username) {
    this.userService.approveRegistration(username).subscribe((response) => {
      if (response["message"] == "user registered") {
        this.getAllNotApprovedUsers();
      } else {
        alert("user not added");
      }
    })
  }

  discard(username) {
    this.userService.discardRegistration(username).subscribe((response) => {
      if (response["message"] == "user deleted") {
        this.getAllNotApprovedUsers();
      } else {
        alert("user not deleted");
      }
    })
  }
}
