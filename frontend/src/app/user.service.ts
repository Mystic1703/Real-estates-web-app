import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  uri = "http://localhost:4000";
  user: User;

  login(username, password) {
    const data = {
      username: username,
      password: password
    };
    return this.http.post(`${this.uri}/user/login`, data);
  }

  getLoggedUser() {
    return JSON.parse(localStorage.getItem("logged"));
  }

  findUserByUsername(username) {
    const data = {
      username: username,
    };

    return this.http.post(`${this.uri}/user/findUserByUsername`, data);
  }

  findUserByMail(mail) {
    const data = {
      mail: mail
    };

    return this.http.post(`${this.uri}/user/findUserByMail`, data);
  }

  addUser(username, firstname, lastname, password, city, country, type, approved, mail, avatar) {
    const data = {
      username: username,
      mail: mail,
      firstname: firstname,
      lastname: lastname,
      password: password,
      city: city,
      country: country,
      type: type,
      approved: approved,
      avatar: avatar
    }

    return this.http.post(`${this.uri}/user/addUser`, data);
  }

  changePassword(username, password) {
    const data = {
      username: username,
      password: password
    };

    return this.http.post(`${this.uri}/user/changePassword`, data);
  }

  logout() {
    localStorage.removeItem("logged");
    this.router.navigate(["login"]);
  }

  approveRegistration(username) {
    const data = {
      username: username
    };

    return this.http.post(`${this.uri}/user/approveRegistration`, data);
  }

  discardRegistration(username) {
    const data = {
      username: username
    };

    return this.http.post(`${this.uri}/user/discardRegistration`, data);
  }

  getAllNotApprovedUsers() {
    return this.http.get(`${this.uri}/user/getAllNotApprovedUsers`);
  }

  getAllUsers() {
    return this.http.get(`${this.uri}/user/getAllUsers`);
  }

  validateUser(username, mail) {
    this.findUserByUsername(username).subscribe((user1: User) => {
      if (user1)
        return false;
      else {
        this.findUserByMail(mail).subscribe((user2: User) => {
          if (user2)
            return false;
          else return true;
        })
        return false;
      }
    })
    return false;
  }

  updateUser(newUserData: User) {

    const data = {
      "user": newUserData
    };
    return this.http.post(`${this.uri}/user/updateUser`, data);
  }

  uploadPicture(picture: FormData) {
    return this.http.post(`${this.uri}/user/uploadPicture`, picture);
  }

  blockUser(username, blockedUsername) {
    const data = {
      username: username,
      blockedUsername: blockedUsername
    };

    return this.http.post(`${this.uri}/user/blockUser`, data);
  }

  unblockUser(username, blockedUsername) {
    const data = {
      username: username,
      blockedUsername: blockedUsername
    };

    return this.http.post(`${this.uri}/user/unblockUser`, data);
  }

  checkUsersBlockList(username1, username2) {
    const data = {
      username1: username1,
      username2: username2
    };

    return this.http.post(`${this.uri}/user/checkUsersBlockList`, data);
  }

  getAllApprovedUsers() {
    return this.http.get(`${this.uri}/user/getAllApprovedUsers`);
  }

  setAvatar(username) {
    const data = {
      username: username
    };

    return this.http.post(`${this.uri}/user/setAvatar`, data);
  }
}
