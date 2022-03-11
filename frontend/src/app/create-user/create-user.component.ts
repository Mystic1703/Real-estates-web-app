import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string;
  firstname: string;
  lastname: string;
  country: string;
  city: string;
  password: string;
  mail: string;
  type: string;
  picture: File;

  create() {

    this.userService.findUserByUsername(this.username).subscribe((user: User) => {
      if (!user) {
        this.userService.findUserByMail(this.mail).subscribe((user2: User) => {
          if (!user2) {
            let count = 0;
            let char;
            for (let i = 0; i < this.password.length; i++) {
              if (count == 0) {
                char = this.password.charAt(i);
                count++;
                continue;
              } else {
                if (char == this.password.charAt(i)) {
                  count++;
                  if (count == 3) {
                    Swal.fire("Error", "Password doesn't match with the pattern", "error");
                    return;
                  }
                } else {
                  count = 1;
                  char = this.password.charAt(i);
                }
              }
            }
            let avatar: boolean;
            if (this.picture) avatar = true;
            else avatar = false;
            this.userService.addUser(this.username, this.firstname, this.lastname,
              this.password, this.city, this.country, this.type, true, this.mail, avatar).subscribe(res => {
                if (res["message"] == "user added") {
                  this.upload();
                }
              })
          } else {
            Swal.fire("Error", "E-mail already in use", "error");
          }
        })
      } else {
        Swal.fire("Error", "Username already taken", "error");
      }
    })
  }

  onFileChange(event) {
    this.picture = event.target.files[0];
  }

  upload() {
    if (this.picture) {
      const formData = new FormData();
      formData.append("profilePicture", this.picture);
      formData.append("username", this.username);

      this.userService.uploadPicture(formData).subscribe(() => {
        Swal.fire("Success", "User created", "success");
        this.router.navigate(["login"]);
      });
    }
  }
}
