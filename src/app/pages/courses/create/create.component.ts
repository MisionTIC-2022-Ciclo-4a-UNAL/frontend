import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Course } from '../../../models/course.model';
import { Department } from '../../../models/department.model';
import { CoursesService } from '../../../services/courses.service';
import { DepartmentsService } from '../../../services/departments.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

    creationMode: boolean = true;
    sendingAttemp: boolean = false;
    courseId: string;
    departments: Department[];
    course: Course = {
      name: "",
      credits: null,
      department: {
        _id: null,
      }
    }
  
    constructor(private coursesService: CoursesService,
                private departmentsService: DepartmentsService,
                private router: Router,
                private activatedRoute: ActivatedRoute) { }
  
    ngOnInit(): void {
      this.getDepartments();
      if(this.activatedRoute.snapshot.params.userId){
        this.creationMode = false;
        this.courseId = this.activatedRoute.snapshot.params.courseId;
        this.getUser(this.courseId);
      }
      else
        this.creationMode = true;
    }
  
    getDepartments(): void{
      this.departmentsService.list().subscribe(
        data => {
          this.departments = data;
        },
        error => {
          console.log(error);
        }
      );
    }
  
    getUser(id: string): void{
      this.coursesService.getOne(id).subscribe(
        data => {
          this.course = data;
        },
        error => {
          console.log(error);
        }
      );
    }
  
    validateMandatoryData(): boolean {
      this.sendingAttemp = true;
      if(this.course.name=="" || this.course.credits==null || this.course.department._id==null)
        return false;
      else
        return true;
    }
  
    create(): void {
      if(this.validateMandatoryData()){
        this.coursesService.create(this.course).subscribe(
          data => {
            Swal.fire({
              title: 'Creado',
              text: 'El curso se ha creado correctamente.',
              icon: 'success',
            });
            this.router.navigate(["pages/cursos/listar"]);    
          },
          error => {
            console.log(error);
            Swal.fire({
              title: 'Falla en el servidor',
              text: 'El curso no ha podido ser creado. Intente de nuevo mas tarde.',
              icon: 'error',
              timer: 5000
            })
          }
        )
      }
      else {
        Swal.fire({
          title: 'Campos obligatorios',
          text: 'Por favor diligencie todos los campos obligatorios.',
          icon: 'warning',
          timer: 5000
        })
      }
    }
  
    edit(): void{
      if(this.validateMandatoryData()){
        delete this.course._id
        let department_: Department = {
          _id: this.course.department._id,
        }
        this.course.department = department_;
        this.departmentsService.edit(this.courseId, this.course).subscribe(
          data => {
            Swal.fire(
              'Actualizado',
              'El usuario ha sido correctamente actualizado.',
              'success'
            );
            this.router.navigate(["pages/usuarios/listar"]);    
          },
          error => {
            console.log(error);
          }
        )
      }
      else {
        Swal.fire({
          title: 'Campos obligatorios',
          text: 'Por favor diligencie todos los campos obligatorios.',
          icon: 'warning',
          timer: 5000
        })
      }
    }
  }
  