import { Component, OnInit } from '@angular/core';
import { Student } from '../../../models/student.model';
import { ReportsService } from '../../../services/reports.service';
import { StudentsService } from '../../../services/students.service';

@Component({
  selector: 'ngx-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  columnNames: string[] = ['Nombre', 'Apellido', 'Inscripciones'];
  totalMode: boolean = true; // true=all    false=one
  dataStudents: Object;
  dataStudent: Object = {
    name: "",
    lastname: "",
    enrollments: null,
  };
  students: Student[]
  studentId: string = "";
  

  constructor(private reportsServices: ReportsService,
              private studentsService: StudentsService) { }

  ngOnInit(): void {
    this.getStudents();
    if(this.totalMode)
      this.getDataFull();
  }

  getStudents(): void{
    this.studentsService.list().subscribe(
      data => {
        this.students = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getDataFull(): void{
    this.totalMode = true;
    this.reportsServices.studentsReport().subscribe(
      data => {
        this.dataStudents = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getDataOne(): void{
    this.totalMode = false;
    this.reportsServices.studentReport(this.studentId).subscribe(
      data => {
        this.dataStudent = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  change(): void{
    console.log("change--- "+this.studentId);
    if(this.studentId != "")
      this.getDataOne();
    this.ngOnInit();
  }
}
