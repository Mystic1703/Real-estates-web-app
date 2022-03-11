import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstateService } from '../estate.service';
import { MessageService } from '../message.service';
import { Estate } from '../models/estate';
import { Message } from '../models/message';
import { Offer } from '../models/offer';
import { User } from '../models/user';
import { OfferService } from '../offer.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  constructor(private messageService: MessageService,
    private estateService: EstateService, private router: Router,
    private userService: UserService, private offerService: OfferService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem("logged"));
    this.getAllConversations();
  }

  loggedUser: User;

  getAllConversations() {
    let username;
    this.loggedUser = JSON.parse(localStorage.getItem("logged"));
    if (this.loggedUser.type == "agent") username = "agency";
    else username = this.loggedUser.username;
    this.messageService.getAllConversations(this.title, username).subscribe((allInterlocutors: string[]) => {
      this.interlocutors = allInterlocutors;
      this.selectedUsername = "";
      //this.blockedUsers = false;
      this.messages = [];
    });
  }

  getAllMessages() {
    let username1;
    if (this.loggedUser.type == "agent") username1 = "agency";
    else username1 = this.loggedUser.username;
    this.messageService.getAllMessages(this.title, username1, this.selectedUsername).subscribe((allMessages: Message[]) => {
      allMessages.sort((a, b) => {
        let aDate = new Date(a.time);
        let bDate = new Date(b.time);
        if (aDate > bDate) return 1;
        else if (aDate < bDate) return -1;
        else return 0;
      })
      this.messages = allMessages;
    })
    let username;
    if ((this.selectedEstate.owner == this.loggedUser.username)
      || (this.selectedEstate.owner == "agency" && this.loggedUser.type == "agent")) {
      username = this.selectedUsername;
    } else {
      username = this.loggedUser.username;
    }
    this.offerService.checkIfUserReserved(username, this.selectedEstate.address).subscribe((offer: Offer) => {
      if (offer == null) {
        this.offerGiven = false;
        if (!this.selectedEstate.rented) {
          if (this.selectedEstate.sold) {
            this.offerGiven = true;
            this.canAccept = false;
          }
        }
        return;
      } else {
        this.offerGiven = true;
        this.offerService.checkIfOfferActive(this.selectedEstate.address).subscribe((offers: Offer[]) => {
          if (offers.length > 0) {
            if (this.selectedEstate.rented) {
              this.offerService.getAllNotAcceptedOffersFromEstate(this.selectedEstate.address).subscribe((allOffers: Offer[]) => {
                if (allOffers) {
                  for (let o of offers) {
                    let start = new Date(o.from.toString());
                    let end = new Date(o.to.toString());
                    let indexes: number[] = this.checkOverlap(start, end, allOffers);
                    if (indexes.length > 0) {
                      this.canAccept = false;
                      return;
                    }
                  }
                  //this.canAccept = true;
                }
                this.canAccept = true;
              })
            } else {
              this.offerGiven = (offers.length > 0);
              this.canAccept = (offers.length == 0);
            }
          }
          else {
            //this.offerGiven = false;
            this.canAccept = true;
          }
        })
      }
    })
  }

  sendMessage() {
    if (this.newMessage.length > 0) {
      let date = new Date();
      let sender;
      if (this.loggedUser.type == "agent") sender = "agency";
      else sender = this.loggedUser.username;
      this.messageService.addNewMessage(this.newMessage, sender,
        this.selectedUsername, date, this.selectedEstate.address, this._title).subscribe(resp => {
          if (resp["message"] == "message sent") {
            this.getAllMessages();
            this.newMessage = "";
          }
        })
    }
  }

  offerGiven: boolean;
  canAccept: boolean;
  messages: Message[];
  selectedUsername: string;
  blockedUsers: boolean;
  interlocutors: string[];
  newMessage: string;
  selectedEstate: Estate;
  @Input() get title(): string { return this._title; }
  set title(title: string) { this._title = title; this.getAllConversations(); this.getEstate(); }
  _title: string;

  getEstate() {
    this.estateService.findEstate(this._title).subscribe((estate: Estate) => {
      this.selectedEstate = estate;
    })
  }

  checkOwner() {
    if (this.selectedEstate.owner == this.loggedUser.username) return false;
    else {
      if (this.selectedEstate.owner == "agency" && this.loggedUser.type == "agent") return false;
      else return true;
    }
  }


  offer() {
    localStorage.setItem("estate", JSON.stringify(this.selectedEstate));
    this.router.navigate(["estate-detail"]);
  }

  checkBlockedUser() {
    this.userService.checkUsersBlockList(this.selectedUsername,
      JSON.parse(localStorage.getItem("logged")).username).subscribe(resp => {
        this.blockedUsers = (resp["message"] == "blocked");
      })
  }

  accept() {
    this.offerService.acceptOffer(this.selectedUsername, this.selectedEstate.address).subscribe((offer: Offer) => {
      if (offer) {
        if (this.selectedEstate.owner == "agency") {
          if (this.selectedEstate.rented) {
            this.deleteOverlapedOffers(offer);
          } else {
            this.deleteOtherOffers();
            this.estateService.setSold(this.selectedEstate.address).subscribe((resp) => {
              if (resp["message"] == "ok") {

              }
            })
          }
        }
        let username;
        if ((this.selectedEstate.owner == this.loggedUser.username)
          || (this.selectedEstate.owner == "agency" && this.loggedUser.type == "agent")) {
          username = this.selectedUsername;
        } else {
          username = this.loggedUser.username;
        }
        this.offerService.checkIfUserReserved(username, this.selectedEstate.address).subscribe((offer: Offer) => {
          this.offerGiven = (offer != null);
        })
      }
    })
  }

  getOptionLabel(username: string) {
    if ((this.selectedEstate.owner == username) ||
      (this.selectedEstate.owner == "agency" && this.loggedUser.type != "agent")) {
      return "Owner";
    } else return "Customer " + username.charAt(0).toUpperCase();
  }

  decline() {
    this.offerService.declineOffer(this.selectedUsername, this.selectedEstate.address).subscribe(resp => {
      if (resp["message"] == "ok") {
        this.offerService.checkIfUserReserved(this.selectedUsername, this.selectedEstate.address).subscribe((offer: Offer) => {
          this.offerGiven = (offer != null);
        })
      }
    })
  }

  deleteOverlapedOffers(offer: Offer) {
    let start = new Date(offer.from);
    let end = new Date(offer.to);
    this.offerService.getAllNotAcceptedOffersFromEstate(this.selectedEstate.address).subscribe((allOffers: Offer[]) => {
      let indexes: number[] = this.checkOverlap(start, end, allOffers);
      this.offerService.deleteMultipleOffers(indexes).subscribe(resp => {
        if (resp["message"] == "ok") {
          // this.offerService.checkIfUserReserved(this.selectedUsername, this.selectedEstate.address).subscribe((offer: Offer) => {
          //   this.offerGiven = (offer != null);
          // })
        }
      })
    })
  }


  checkOverlap(start: Date, end: Date, offers: Offer[]) {
    let indexes: number[] = [];
    for (let offer of offers) {
      let from = new Date(offer.from);
      let to = new Date(offer.to);
      if ((end >= from) && (start <= to))
        indexes.push(offer.id);
    }
    return indexes;
  }

  deleteOtherOffers() {
    this.offerService.deleteOtherOffers(this.selectedEstate.address).subscribe(resp => {
      if (resp["message"] != "ok") {
        alert("error");
      } else {
        this.offerService.checkIfUserReserved(this.selectedUsername, this.selectedEstate.address).subscribe((offer: Offer) => {
          this.offerGiven = (offer != null);
        })
      }
    })
  }
}
