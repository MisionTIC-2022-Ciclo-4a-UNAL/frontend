import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Course } from '../../../models/course.model';
import { CoursesService } from '../../../services/courses.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columnNames: string[] = ['Nombre', 'Creditos', 'Departamento', 'Opciones']
  courses: Course[];

  constructor(private coursesService: CoursesService,
              private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    this.coursesService.list().subscribe(
      data => {
        this.courses = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  create(): void{
    this.router.navigate(["pages/cursos/crear"]);
  }

  edit(id: string): void{
    this.router.navigate(["pages/cursos/actualizar/"+id]);
  }

  delete(id: string){
    Swal.fire({
      title: 'Eliminar Curso',
      text: '¿Está seguro que desea eliminar al curso?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#D33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar',
      confirmButtonColor: '#3085D6',
    }).then((result) => {
      if(result.isConfirmed){
        this.coursesService.delete(id).subscribe(
          data => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El curso ha sido eliminado correctamente.',
              icon: 'success'
            });
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
