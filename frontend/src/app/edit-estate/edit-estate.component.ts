import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstateService } from '../estate.service';
import { MessageService } from '../message.service';
import { Estate } from '../models/estate';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

@Component({
  selector: 'app-edit-estate',
  templateUrl: './edit-estate.component.html',
  styleUrls: ['./edit-estate.component.css']
})
export class EditEstateComponent implements OnInit {

  constructor(private estateService: EstateService, private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAllEstates();
  }

  estates: Estate[];

  getAllEstates() {
    let user = JSON.parse(localStorage.getItem("logged"));
    let username = (user.type == "agent") ? "agency" : user.username;
    this.estateService.getAllEstatesFromUser(username).subscribe((allEstates: Estate[]) => {
      this.estates = allEstates;
    })
  }

  change(estate: Estate) {
    this.estateService.updateEstate(estate).subscribe((newEstate: Estate) => {
      if (newEstate) {
        this.messageService.updateMessages(newEstate.description, newEstate.address).subscribe(resp => {
          if (resp["message"] == "ok") {
            if (this.picture.length > 0) {
              this.upload(newEstate);
            }
            Swal.fire("Success", "Data changed", "success");
          }
        })
      }
    })
  }

  picture: File[] = [];

  upload(estate: Estate) {
    if (this.picture) {
      const formData = new FormData();
      for (let i = 0; i < this.picture.length; i++) {
        formData.append("estatePicture" + (estate.pictures + i + 1), this.picture[i]);
      }
      formData.append("estate", estate.address);
      formData.append("length", this.picture.length.toString());
      formData.append("startIndex", estate.pictures.toString());
      this.estateService.uploadPicture(formData).subscribe(() => {
        let pictures = estate.pictures + this.picture.length;
        this.estateService.updatePictureNumber(estate.address, estate.owner, pictures).subscribe(resp => {
          if (resp["message"] == "ok") {
            this.getAllEstates();
          }
        })
      });
    }
  }

  onFileChange(event) {
    this.picture = event.target.files;
  }
}
