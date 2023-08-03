import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  getStudents() {
    const localStorages = localStorage.getItem('students');
    console.log(123)
    return localStorages ? JSON.parse(localStorages) : [];
  }

  getStudentByEmail(email: string): any {
    let students = JSON.parse(localStorage.getItem('students') || '[]');
    return students.find((student: any) => student.email === email);
  }

  studentUpdate(data: any) {
    let students = JSON.parse(localStorage.getItem('students') || '[]');
    let studentIndex = students.findIndex((student: any) => student.email === data.email);
    students[studentIndex] = data;
    localStorage.setItem('students', JSON.stringify(students));
  }
}
