
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { User } from '../models/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("logged"));
    let username: string;
    if (this.user.type == "agent") username = "agent";
    else {
      if (this.user.avatar) username = this.user.username;
      else username = "default";
    }
    this.avatar_url_logged = "http://localhost:4000/static/userImages/" + username + ".png";
  }

  user: User;

  avatar_url_logged: string;
  avatar_url_interlocutor = "http://localhost:4000/static/userImages/default.png";

  @Input() messages: Message[];

  checkMessageSide(message: Message) {
    if (message.sender == this.user.username || (message.sender == "agency" && this.user.type == "agent"))
      return true;
    else return false;
  }

  getDateAndTime(message: Message) {
    let date = new Date(message.time);
    let minutes = date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes();
    let hours = date.getHours() < 10 ? ("0" + date.getHours()) : date.getHours();
    let month = (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1);
    let day = date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate();
    return hours + ":" + minutes + " " + day + "/" + month;
  }
}
