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

    getStudentByEmail(email: string): any {
        let students = JSON.parse(localStorage.getItem('students') || '[]');
        return students.find((student: any) => student.email === email);
    }
}
