import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  firstname: string;
  lastname: string;
  username: string;
  mail: string;
  city: string;
  country: string;
  password: string;
  retype: string;

  register() {
    if (this.password != this.retype) {
      Swal.fire("Error", "Password and confirmation doesn't match", "error");
    } else {
      this.userService.findUserByUsername(this.username).subscribe((user: User) => {
        if (user) {
          Swal.fire("Error", "Username already taken", "error");
        } else {
          this.userService.findUserByMail(this.mail).subscribe((userMail: User) => {
            if (userMail) {
              Swal.fire("Error", "E-mail already in use", "error");
            } else {
              let avatar: boolean;
              if (this.picture) avatar = true;
              else avatar = false;
              this.userService.addUser(this.username, this.firstname, this.lastname,
                this.password, this.city, this.country, "regular", false, this.mail, avatar).subscribe(res => {
                  if (res["message"] != "user added") {
                    Swal.fire("Error", "Error", "error");
                  } else {
                    this.upload();
                  }
                })
            }
          })
        }
      })
    }
  }

  picture: File;
  upload() {
    if (this.picture) {
      const formData = new FormData();
      formData.append("profilePicture", this.picture);
      formData.append("username", this.username);

      this.userService.uploadPicture(formData).subscribe(() => {
        Swal.fire("Success", "Registration request sent!", "success");
        this.router.navigate(["login"]);
      });
    } else {

    }
  }

  onFileChange(event) {
    this.picture = event.target.files[0];
  }
}
