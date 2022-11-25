import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  departments: Department[];
  columnNames: string[] = ['Nombre', 'Opciones']

  constructor(private departmentsService: DepartmentsService,
              private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    this.departmentsService.list().subscribe(
      data => {
        this.departments = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  create(): void{
    this.router.navigate(["pages/departamentos/crear"]);
  }

  edit(id: string): void{
    this.router.navigate(["pages/departamentos/actualizar/"+id]);
  }

  delete(id: string): void{
    Swal.fire({
      title: 'Eliminar Departamento',
      text: '¿Está seguro que quiere eliminar a el departamento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#D33',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if(result.isConfirmed){
        this.departmentsService.delete(id).subscribe(
          data => {
            Swal.fire(
              '¡Eliminado!',
              'El departamento ha sido eliminado correctamente.',
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
