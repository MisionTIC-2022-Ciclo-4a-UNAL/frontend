import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Rol } from '../../../models/rol.model';
import { RolesService } from '../../../services/roles.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  roles: Rol[];
  columnNames: string[] = ['Nombre', 'Descripcion', 'Opciones']

  constructor(private rolesService: RolesService,
              private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    this.rolesService.list().subscribe(
      data => {
        this.roles = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  create(): void{
    this.router.navigate(["pages/roles/crear"]);
  }

  edit(id: string): void{
    this.router.navigate(["pages/roles/actualizar/"+id]);
  }

  delete(id: number): void{
    Swal.fire({
      title: 'Eliminar Rol',
      text: '¿Está seguro que quiere eliminar al rol?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#D33',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if(result.isConfirmed){
        this.rolesService.delete(id).subscribe(
          data => {
            Swal.fire(
              '¡Eliminado!',
              'El rol ha sido eliminado correctamente.',
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
