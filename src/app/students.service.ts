import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor() { }

  getStudents() {
    const localStorages = localStorage.getItem('students');
    return localStorages ? JSON.parse(localStorages) : [];
  }

  getStudentByEmail(email: string) {
      const students = this.getStudents();
      return students.find((student: any) => student.email === email);
  }
}
