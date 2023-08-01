import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  activeUser: any;

  constructor(
    private modalCtrl: ModalController,
  ) {
    const localStorages = localStorage.getItem('userActive');
    this.activeUser = localStorages ? JSON.parse(localStorages) : {};
  }

  ngOnInit() {
  }

  onEditProfile() {
    this.modalCtrl.create({
      component: EditProfileComponent
    }).then(modalEl => {
      modalEl.present();
    })
  }

}
