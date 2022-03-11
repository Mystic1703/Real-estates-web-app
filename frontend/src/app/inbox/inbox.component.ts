import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(private messageService: MessageService, private userService: UserService) { }

  ngOnInit(): void {
    this.getConversationTitles();
  }

  titles: string[];
  messageTitle: string;

  getConversationTitles() {
    let username;
    let user = JSON.parse(localStorage.getItem("logged"));
    if (user.type == "agent") username = "agency";
    else username = user.username;
    this.messageService.getConversationTitles(username).subscribe((messageTitle: string[]) => {
      this.titles = messageTitle;
    })
  }


  getMessageTitle(title) {
    this.messageTitle = title;
  }
}
