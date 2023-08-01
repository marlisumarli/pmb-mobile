import {Component} from '@angular/core';
import {StudentsService} from "../../students.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  students: any;

  constructor(
    private studentsService: StudentsService
  ) {
  }

  ionViewWillEnter() {
    this.students = this.studentsService.getStudents();
  }
}
