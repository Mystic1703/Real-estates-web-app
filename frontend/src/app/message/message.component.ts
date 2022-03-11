import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Estate } from '../models/estate';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.estate = JSON.parse(localStorage.getItem("estate"));
  }

  estate: Estate;
  messageText: string;

  sendMessage() {
    if (this.messageText.length > 0) {
      let sender = JSON.parse(localStorage.getItem("logged")).username;
      let reciever = this.estate.owner;
      let date = new Date().toString();

      this.messageService.addNewMessage(this.messageText, sender,
        reciever, date, this.estate.address, this.estate.description).subscribe(resp => {
          if (resp["message"] == "message sent") {
            Swal.fire("Success", "Message sent", "success");
          }
        })
    }
  }
}
