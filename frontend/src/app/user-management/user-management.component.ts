import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  users: User[];

  getAllUsers() {
    this.userService.getAllApprovedUsers().subscribe((allUsers: User[]) => {
      this.users = allUsers;
    });
  }

  deleteUser(username) {
    this.userService.discardRegistration(username).subscribe(res => {
      if (res["message"] == "user deleted") {
        this.getAllUsers();
      }
    });
  }

  updateUser(user: User) {
    localStorage.setItem("update-user", JSON.stringify(user));
    this.router.navigate(["update-user"]);
  }
}
