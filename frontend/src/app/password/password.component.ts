import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  oldPassword: string;
  newPassword: string;
  retype: string;

  changePassword() {
    let loggedUser = JSON.parse(localStorage.getItem("logged"));
    this.userService.findUserByUsername(loggedUser.username).subscribe((user: User) => {
      let password = user.password;
      if (password != this.oldPassword) {
        Swal.fire("Error", "Your old password doesn't match", "error");
      } else if (this.newPassword != this.retype) {
        Swal.fire("Error", "New password and confirm password doesn't match", "error");
      } else {
        let count = 0;
        let char;
        for (let i = 0; i < this.newPassword.length; i++) {
          if (count == 0) {
            char = this.newPassword.charAt(i);
            count++;
            continue;
          } else {
            if (char == this.newPassword.charAt(i)) {
              count++;
              if (count == 3) {
                Swal.fire("Error", "You can't have more than 3 same succesive characters", "error");
                return;
              }
            } else {
              count = 1;
              char = this.newPassword.charAt(i);
            }
          }
        }
        this.userService.changePassword(user.username, this.newPassword).subscribe((response) => {
          if (response["message"] == "ok") {
            Swal.fire("Success", "Password changed", "success");
            this.userService.logout();
          }
        })
      }
    })
  }
}
