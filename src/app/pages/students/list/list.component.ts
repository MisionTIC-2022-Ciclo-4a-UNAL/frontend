import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Student } from '../../../models/student.model';
import { StudentsService } from '../../../services/students.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  /**
   * 
   */
  students: Student[];
  columnNames: string[] = ['Cedula', 'Nombre', 'Apellido', 'Opciones']

  /**
   * 
   * @param studentsService 
   * @param router 
   */
  constructor(private studentsService: StudentsService,
              private router: Router) { }

  /**
   * 
   */
  ngOnInit(): void {
    this.list();
  }

  /**
   * 
   */
  list(): void{
    this.studentsService.list().subscribe(
      data => {
        this.students = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * 
   */
  create(): void{
    this.router.navigate(["pages/estudiantes/crear"]);
  }

  /**
   * 
   * @param id 
   */
  edit(id: string): void{
    this.router.navigate(["pages/estudiantes/actualizar/"+id]);
  }

  /**
   * 
   * @param id 
   */
  delete(id: string): void{
    Swal.fire({
      title: 'Eliminar Estudiante',
      text: '¿Está seguro que quiere eliminar al estudiante?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#D33',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if(result.isConfirmed){
        this.studentsService.delete(id).subscribe(
          data => {
            Swal.fire(
              '¡Eliminado!',
              'El estudiante ha sido eliminado correctamente.',
              'success'
            ),
            this.ngOnInit();
          },
          error => {
            console.log(error);
          }
        )
      }
    })
  }
}
