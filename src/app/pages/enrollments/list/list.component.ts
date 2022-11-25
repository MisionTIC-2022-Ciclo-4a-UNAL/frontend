import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Enrollment } from '../../../models/enrollment.model';
import { EnrollmentsService } from '../../../services/enrollments.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columnNames: string[] = ['Estudiante', 'Curso', 'Año', 'Semestre', 'Nota', 'Opciones']
  enrollments: Enrollment[];

  constructor(private enrollmentsService: EnrollmentsService,
              private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    this.enrollmentsService.list().subscribe(
      data => {
        this.enrollments = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  create(): void{
    this.router.navigate(["pages/inscripciones/crear"]);
  }

  edit(id: string): void{
    this.router.navigate(["pages/inscripciones/actualizar/"+id]);
  }

  delete(id: string): void{
    Swal.fire({
      title: 'Eliminar Inscripcion',
      text: '¿Está seguro que quiere eliminar la inscripcion?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#D33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar',
      confirmButtonColor: '#3085D6',
    }).then((result) => {
      if(result.isConfirmed){
        this.enrollmentsService.delete(id).subscribe(
          data => {
            Swal.fire(
              '¡Eliminada!',
              'La inscripcion ha sido eliminada correctamente.',
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
