import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Course } from '../../../models/course.model';
import { Enrollment } from '../../../models/enrollment.model';
import { Student } from '../../../models/student.model';
import { CoursesService } from '../../../services/courses.service';
import { EnrollmentsService } from '../../../services/enrollments.service';
import { StudentsService } from '../../../services/students.service';


@Component({
  selector: 'ngx-create', // HTML Tag
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  years: number[] =  [...Array(2023 - 1990).keys()].map(x => x + 1990);
  creationMode: boolean = true;
  enrollmentId: string = "";
  sendingAttemp: boolean = false;
  enrollment: Enrollment = {
    year: null,
    semester: null,
    grade: null,
    student: {
      _id: null
    },
    course: {
      _id: null
    },
  }
  courses: Course[];
  students: Student[];

  /**
   * 
   * @param enrollmentsService
   * @param activatedRoute 
   * @param router 
   */
  constructor(private enrollmentsService: EnrollmentsService,
              private studentsService: StudentsService,
              private coursesService: CoursesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  /**
   * 
   */
  ngOnInit(): void {
    this.getCourses();
    this.getStudents();
    if(this.activatedRoute.snapshot.params.enrollmentId){
      this.creationMode = false;
      this.enrollmentId = this.activatedRoute.snapshot.params.enrollmentId;
      this.getEnrollment(this.enrollmentId);
    }
    else
      this.creationMode = true;
  }

  /**
   * 
   * @param id 
   */
  getEnrollment(id: string): void {
    this.enrollmentsService.getOne(id).subscribe(
      data => {
        this.enrollment = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getCourses(): void {
    this.coursesService.list().subscribe(
      data => {
        this.courses = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  getStudents(): void {
    this.studentsService.list().subscribe(
      data => {
        this.students = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  /**
   * 
   * @returns 
   */
  validateMandatoryData(): boolean {
    this.sendingAttemp = true;
    if(this.enrollment.year==null || this.enrollment.semester==null || this.enrollment.grade==null)
      return false;
    else
      return true;
  }

  /**
   * 
   */
  create(): void{
    if(this.validateMandatoryData){
      this.enrollmentsService.create(this.enrollment).subscribe(
        data => {
          Swal.fire(
            'Creado',
            'La inscripcion ha sido creada correctamente.',
            'success'
          );
          this.router.navigate(['pages/inscripciones/listar']);
        },
        error => {
          Swal.fire({
            title: 'Falla en el Servidor',
            text: 'La inscripcion no ha podido ser creada. Intente de nuevo.',
            icon: 'error',
            timer: 5000
          });
        }
      )
    }
    else{
      Swal.fire({
        title: 'Campos Obligatorios',
        text: 'Por favor diligencie todos los campos obligatorios.',
        icon: 'warning',
        timer: 5000
      });
    }
  }

  /**
   * 
   */
  edit(): void{
    if(this.validateMandatoryData){
      delete this.enrollment._id;
      this.enrollmentsService.edit(this.enrollmentId, this.enrollment).subscribe(
        data => {
          Swal.fire(
            'Actualizada',
            'La inscripcion ha sido actualizada correctamente.',
            'success'
          );
          this.router.navigate(['pages/inscripciones/listar']);
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Falla en el Servidor',
            text: 'La inscripcion no ha podido ser actualizada. Intente de nuevo.',
            icon: 'error',
            timer: 5000
          });
        }
      )
    }
    else{
      Swal.fire({
        title: 'Campos Obligatorios',
        text: 'Por favor diligencie todos los campos obligatorios.',
        icon: 'warning',
        timer: 5000
      });
    }
  }
}
