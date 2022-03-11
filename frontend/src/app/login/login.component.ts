import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem("logged");
  }

  username: string;
  password: string;


  login() {
    this.userService.login(this.username, this.password).subscribe((user: User) => {
      if (user) {
        if (user.approved) {
          localStorage.setItem("logged", JSON.stringify(user));
          this.router.navigate(["homepage"]);
        } else {
          Swal.fire("Error", "Your account hasn't been approved yet", "error");
        }
      } else {
        Swal.fire('Error', 'Incorrect username or password', 'error');
      }
    })
  }
}
