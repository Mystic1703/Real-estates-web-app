import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  @Input() loggedUser: User;

  checkUser() {
    if (this.loggedUser == null) return false;
    if (this.loggedUser.type == "regular")
      return false;
    else return true;
  }

  checkAgent() {
    if (this.loggedUser == null) return false;
    if (this.loggedUser.type == "agent") return true;
    else return false;
  }

  checkAdmin() {
    if (this.loggedUser == null) return false;
    if (this.loggedUser.type == "administrator") return true;
    else return false;
  }

  checkRegular() {
    if (this.loggedUser == null) return false;
    if (this.loggedUser.type == "regular") return true;
    else return false;
  }
  logout() {
    this.userService.logout();
  }
}
