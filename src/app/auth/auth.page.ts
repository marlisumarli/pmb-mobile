import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoadingController, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {StudentsService} from "../students.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    isLogin = true;
    isLoading = false;
    formGroup: FormGroup;

    constructor(
        private studentsService: StudentsService,
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        private router: Router
    ) {

    }

    ngOnInit() {

        // Login
        this.formGroup = new FormGroup<any>({
            email: new FormControl(null, {
                updateOn: "change",
                validators: [
                    Validators.required,
                    Validators.email
                ]
            }),
            password: new FormControl(null, {
                updateOn: "change",
                validators: [
                    Validators.required,
                    Validators.minLength(8)
                ]
            })
        });
    }

    onSwitchMode() {
        this.isLogin = !this.isLogin;
        this.formGroup.reset();
        if (!this.isLogin) {

            // Register
            this.formGroup.registerControl('name', new FormControl(null, {
                updateOn: "change",
                validators: [
                    Validators.required,
                    Validators.minLength(3)
                ]
            }));
            this.formGroup.registerControl('confirmPassword', new FormControl(null, {
                updateOn: "change",
                validators: [
                    Validators.required,
                    this.matchValues('password')
                ]
            }));
        } else {

            // Remove
            this.formGroup.removeControl('name');
            this.formGroup.removeControl('confirmPassword');
        }
    }

    matchValues(matchTo: string) {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            const matchToControl = control.parent?.get(matchTo);

            if (matchToControl && matchToControl.value !== control.value) {
                return {'notSame': true};
            }

            return null;
        };
    }

    onLogin() {
        this.loadingCtrl.create({
            mode: "ios",
            keyboardClose: true,
            message: "Tunggu...",
            spinner: "circular"
        }).then(loadingEl => {
            loadingEl.present();

            setTimeout(() => {
                this.isLoading = false;
                const email = this.formGroup.value.email;
                const password = this.formGroup.value.password;

                const student = this.studentsService.getStudentByEmail(email);

               if (student){
                   if (student.email === email && student.password === password){
                       localStorage.setItem('userActive', JSON.stringify(student));
                       this.router.navigateByUrl('/home');
                   } else {
                       this.toastCtrl.create({
                           message: 'Email atau Password Salah.',
                           duration: 2000,
                           color: 'danger',
                           position: 'top'
                       }).then(toastEl => {
                           toastEl.present();
                       })
                   }
               } else {
                   this.toastCtrl.create({
                       message: 'Akun Tidak Ditemukan.',
                       duration: 2000,
                       color: 'danger',
                       position: 'top'
                   }).then(toastEl => {
                       toastEl.present();
                   })
               }
                loadingEl.dismiss();
            }, 1500);
        })
    }

    onRegister() {
        this.loadingCtrl.create({
            mode: "ios",
            keyboardClose: true,
            message: "Tunggu...",
            spinner: "circular"
        }).then(loadingEl => {
            loadingEl.present();

            setTimeout(() => {
                this.isLoading = false;

                const register = {
                    name: this.formGroup.value.name,
                    avatar: '',
                    email: this.formGroup.value.email,
                    password: this.formGroup.value.password,
                }

                const students = this.studentsService.getStudents();
                const student = this.studentsService.getStudentByEmail(register.email);

                if (student) {
                    this.toastCtrl.create({
                        message: 'Email sudah terdaftar!',
                        duration: 2000,
                        color: 'danger',
                        position: 'top'
                    }).then(toastEl => {
                        toastEl.present();
                    })
                } else {
                    students.push(register);
                    localStorage.setItem('students', JSON.stringify(students));
                    localStorage.setItem('userActive', JSON.stringify(register));
                    this.router.navigateByUrl('/home');
                }

                this.formGroup.reset();
                loadingEl.dismiss();
            }, 1500);
        })
    }
}
