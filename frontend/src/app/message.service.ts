import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000";

  addNewMessage(content, sender, reciever, time, address, title) {
    const data = {
      content: content,
      sender: sender,
      reciever: reciever,
      time: time,
      address: address,
      title: title
    };

    return this.http.post(`${this.uri}/message/addNewMessage`, data);
  }

  getConversationTitles(username) {
    const data = {
      username: username
    };

    return this.http.post(`${this.uri}/message/getConversationTitles`, data);
  }

  getAllConversations(title, username) {
    const data = {
      username: username,
      title: title
    };

    return this.http.post(`${this.uri}/message/getAllConversations`, data);
  }

  getAllMessages(title, username1, username2) {
    const data = {
      title: title,
      username1: username1,
      username2: username2
    }

    return this.http.post(`${this.uri}/message/getAllMessages`, data);
  }

  updateMessages(description: string, address: string) {
    const data = {
      description: description,
      address: address
    };

    return this.http.post(`${this.uri}/message/updateMessages`, data);
  }
}
