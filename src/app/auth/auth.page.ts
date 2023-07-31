import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLogin = true;
  formGroup: FormGroup;

  constructor() {
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
        return { 'notSame': true };
      }

      return null;
    };
  }

  onLogin() {
  }

  onRegister() {
  }
}
