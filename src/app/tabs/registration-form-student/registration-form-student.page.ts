import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoadingController, ToastController} from "@ionic/angular";
import {StudentsService} from "../../students.service";

@Component({
  selector: 'app-registration-form-student',
  templateUrl: './registration-form-student.page.html',
  styleUrls: ['./registration-form-student.page.scss'],
})
export class RegistrationFormStudentPage implements OnInit {
  isLoading = false;
  isRegister: boolean;
  formGroup: FormGroup;
  activeUser: any;
  isModalOpen = false;
  userRegisterData: any;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private studentService: StudentsService
  ) {
    const localStorages = localStorage.getItem('userActive');
    this.activeUser = localStorages ? JSON.parse(localStorages) : {};
    this.isRegister = this.activeUser.isRegister;

    const userRegisterData = localStorage.getItem('usersRegisterData');
    this.userRegisterData = userRegisterData ? JSON.parse(userRegisterData) : [];
  }

  ngOnInit() {
    this.formGroup = new FormGroup<any>({
      name: new FormControl(this.activeUser.name, {
        updateOn: "change",
        validators: [
          Validators.required
        ]
      }),
      workStatus: new FormControl(null, {
        updateOn: "change",
        validators: [
          Validators.required
        ]
      }),
      bornDate: new FormControl(null, {
        updateOn: "change",
        validators: [
          Validators.required
        ]
      }),
      genderOption: new FormControl(null, {
        updateOn: "change",
        validators: [
          Validators.required
        ]
      }),
      religionOption: new FormControl(null, {
        updateOn: "change",
        validators: [
          Validators.required
        ]
      }),
      whatsappNumber: new FormControl(null, {
        updateOn: "change",
        validators: [
          Validators.required
        ]
      }),
      homeAddress: new FormControl(null, {
        updateOn: "change",
        validators: [
          Validators.required
        ]
      })
    });
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      return;
    }
    this.isLoading = true;
    this.loadingCtrl.create({
      keyboardClose: true,
      message: "Registering..."
    }).then(loadingEl => {
      loadingEl.present();
      setTimeout(() => {

        let bornDate = new Date(this.formGroup.value.bornDate);
        let formattedBornDate = ("0" + bornDate.getDate()).slice(-2) + "/" + ("0" + (bornDate.getMonth() + 1)).slice(-2) + "/" + bornDate.getFullYear();

        this.isLoading = false;
        loadingEl.dismiss();
        this.isRegister = true;

        const registerData = {
          email: this.activeUser.email,
          name: this.formGroup.value.name,
          workStatus: this.formGroup.value.workStatus,
          bornDate: formattedBornDate,
          genderOption: this.formGroup.value.genderOption,
          religionOption: this.formGroup.value.religionOption,
          whatsappNumber: this.formGroup.value.whatsappNumber,
          homeAddress: this.formGroup.value.homeAddress,
          isRegister: this.isRegister
        };
        localStorage.setItem('userActive', JSON.stringify(registerData));
        localStorage.setItem('usersRegisterData', JSON.stringify(registerData));

        this.toastCtrl.create({
          keyboardClose: true,
          message: "Register success",
          position: "top",
          duration: 2000,
          color: "success"
        }).then(toastEl => {
          toastEl.present();
        });
      }, 2000);
    });
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
