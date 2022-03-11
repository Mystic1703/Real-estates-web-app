import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.userService.getLoggedUser();
    this.newUser = this.userService.getLoggedUser();
    if (this.user.avatar) this.pictureName = this.user.username;
    else this.pictureName = "default";
  }

  newUser: User;
  pictureName: string;

  changePassword() {
    this.router.navigate(["password"]);
  }
  user: User;

  changeData() {
    this.userService.updateUser(this.newUser).subscribe((updatedUser: User) => {
      if (updatedUser) {
        localStorage.setItem("logged", JSON.stringify(updatedUser));
        this.newUser = JSON.parse(localStorage.getItem("logged"));
        this.user = updatedUser;
        this.upload();
      } else {
        alert("Error");
      }
    })
  }

  picture: File;

  upload() {
    if (this.picture) {
      const formData = new FormData();
      formData.append("profilePicture", this.picture);
      formData.append("username", this.user.username);

      this.userService.uploadPicture(formData).subscribe(() => {
        this.userService.setAvatar(this.newUser.username).subscribe(resp => {
          if (resp["message"] == "ok") {
            window.location.reload();
          }
        })
      });
    }
  }

  onFileChange(event) {
    this.picture = event.target.files[0];
  }
}
