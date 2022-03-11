import { Component } from '@angular/core';
import { User } from './models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  getLoggedUser(): User {
    return JSON.parse(localStorage.getItem("logged"));
  }
}
