import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoadingController, ToastController} from "@ionic/angular";

@Component({
    selector: 'app-registration-form-student',
    templateUrl: './registration-form-student.page.html',
    styleUrls: ['./registration-form-student.page.scss'],
})
export class RegistrationFormStudentPage implements OnInit {
    isLoading = false;
    isRegister = true;
    formGroup: FormGroup;

    constructor(
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController
    ) {
    }

    ngOnInit() {
        this.formGroup = new FormGroup<any>({
            name: new FormControl(null, {
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
        })
    }

}
