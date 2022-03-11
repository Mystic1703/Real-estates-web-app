import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.oldUser = JSON.parse(localStorage.getItem("update-user"));
    this.userService.findUserByUsername(this.oldUser.username).subscribe((user: User) => {
      this.newUser = user;
      if (this.newUser.avatar) this.pictureName = this.oldUser.username;
      else this.pictureName = "default";
    })
  }

  pictureName: string;
  oldUser: User;
  newUser: User;

  picture: File;

  upload() {
    if (this.picture) {
      const formData = new FormData();
      formData.append("profilePicture", this.picture);
      formData.append("username", this.newUser.username);

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

  changeData() {
    this.userService.updateUser(this.newUser).subscribe((updatedUser: User) => {
      if (updatedUser) {
        this.oldUser = updatedUser;
        this.userService.findUserByUsername(updatedUser.username).subscribe((user: User) => {
          this.newUser = user;
          this.upload();
        })
      } else {
        //alert("Error");
      }
    })
  }
}
