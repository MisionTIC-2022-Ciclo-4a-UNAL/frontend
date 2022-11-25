import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../../models/user.model';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html', 
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columnNames: string[] = ['Seudonimo', 'Correo', 'Rol', 'Opciones']
  users: User[];

  constructor(private usersService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    this.usersService.list().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  create(): void{
    this.router.navigate(["pages/usuarios/crear"]);
  }

  edit(id: number): void{
    this.router.navigate(["pages/usuarios/actualizar/"+id]);
  }

  delete(id: number){
    Swal.fire({
      title: 'Eliminar Usuario',
      text: '¿Está seguro que desea eliminar al usuario?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#D33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar',
      confirmButtonColor: '#3085D6',
    }).then((result) => {
      if(result.isConfirmed){
        this.usersService.delete(id).subscribe(
          data => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El usuario ha sido eliminado correctamente.',
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
