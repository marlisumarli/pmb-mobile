import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegistrationFormStudentPage} from './registration-form-student.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationFormStudentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationFormStudentPageRoutingModule {
}
