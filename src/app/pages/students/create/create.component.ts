import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Student } from '../../../models/student.model';
import { StudentsService } from '../../../services/students.service';

@Component({
  selector: 'ngx-create', // HTML Tag
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  creationMode: boolean = true;
  studentId: string = "";
  sendingAttemp: boolean = false;
  student: Student = {
    personal_id: "",
    name: "",
    lastname: "",
  }

  /**
   * 
   * @param studentsService 
   * @param activatedRoute 
   * @param router 
   */
  constructor(private studentsService: StudentsService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  /**
   * 
   */
  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.studentId){
      this.creationMode = false;
      this.studentId = this.activatedRoute.snapshot.params.studentId;
      this.getStudient(this.studentId);
    }
    else
      this.creationMode = true;
  }

  /**
   * 
   * @param id 
   */
  getStudient(id: string): void {
    this.studentsService.getOne(id).subscribe(
      data => {
        this.student = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * 
   * @returns 
   */
  validateMandatoryData(): boolean {
    this.sendingAttemp = true;
    if(this.student.personal_id=="" || this.student.name=="" || this.student.lastname=="")
      return false;
    else
      return true;
  }

  /**
   * 
   */
  create(): void{
    if(this.validateMandatoryData){
      this.studentsService.create(this.student).subscribe(
        data => {
          Swal.fire(
            'Creado',
            'El estudiante ha sido creado correctamente.',
            'success'
          );
          this.router.navigate(['pages/estudiantes/listar']);
        },
        error => {
          Swal.fire({
            title: 'Falla en el Servidor',
            text: 'El estudiante no ha podido ser creado. Intente de nuevo.',
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
      let student_: Student = { ...this.student };
      delete student_._id;
      this.studentsService.edit(this.student._id, student_).subscribe(
        data => {
          Swal.fire(
            'Actualizado',
            'El estudiante ha sido actualizado correctamente.',
            'success'
          );
          this.router.navigate(['pages/estudiantes/listar']);
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Falla en el Servidor',
            text: 'El estudiante no ha podido ser actualizado. Intente de nuevo.',
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
