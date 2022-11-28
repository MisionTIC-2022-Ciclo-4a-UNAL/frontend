import { Component, OnInit } from '@angular/core';
import { Course } from '../../../models/course.model';
import { CoursesService } from '../../../services/courses.service';
import { ReportsService } from '../../../services/reports.service';

@Component({
  selector: 'ngx-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  template: `
    <chart type="horizontalBar" [data]="data" [options]="options"></chart>
  `,
})
export class CoursesComponent implements OnInit {

  columnNames = ['Materia', 'Creditos', 'Inscripciones']
  totalMode: boolean = true; // true=all   false=one
  dataCourses: Object;
  dataCourse: Object = {
    name: "",
    credits: null,
    enrollments: null
  };
  courses: Course[];
  courseId: string = "";
  data: Object;
  
  constructor(private reportsService: ReportsService,
              private coursesService: CoursesService) { 
                this.data = {
                  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                  datasets: [{
                      label: 'Dataset 1',
                      backgroundColor: '#550099',
                      borderWidth: 1,
                      data: [5, 6, 3, 4, 5, 7],
                    },
                  ],
                };
  }

  ngOnInit(): void {
    this.getCourses();
    if(this.totalMode)
      this.getDataFull();
  }

  getCourses(): void {
    this.coursesService.list().subscribe(
      data => {
        this.courses = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getDataFull(): void {
    this.totalMode = true;
    this.reportsService.coursesReport().subscribe(
      data => {
        this.dataCourses = data;
      },
      error => {
        console.log(error);
      }
    );
  }


  getDataOne(): void {
    this.totalMode = false;
    this.reportsService.courseReport(this.courseId).subscribe(
      data => {
        if(0 in data)
          this.dataCourse = data[0];
        else
          this.dataCourse = {
            name: "",
            credits: null,
            enrollments: null
          };
      },
      error => {
        console.log(error);
      }
    );
  }

  change(): void {
    console.log(this.courseId);
    if(this.courseId != "")
      this.getDataOne();
    this.ngOnInit();
  }
}

