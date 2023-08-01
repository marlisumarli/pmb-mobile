import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {RegistrationFormStudentPageRoutingModule} from './registration-form-student-routing.module';

import {RegistrationFormStudentPage} from './registration-form-student.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationFormStudentPageRoutingModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [RegistrationFormStudentPage]
})
export class RegistrationFormStudentPageModule {
}
