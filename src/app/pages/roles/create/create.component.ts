import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true;
  sendingAttemp: boolean = false;
  departmentId: string = "";
  department: Department = {
    name: "",
  }

  /**
   * 
   * @param departmentsService 
   * @param activatedRoute 
   * @param router 
   */
  constructor(private departmentsService: DepartmentsService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  /**
   * 
   */
  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.departmentId){
      this.creationMode = false;
      this.departmentId = this.activatedRoute.snapshot.params.departmentId;
      this.getStudient(this.departmentId);
    }
    else
      this.creationMode = true;
  }

  /**
   * 
   * @param id 
   */
  getStudient(id: string): void {
    this.departmentsService.getOne(id).subscribe(
      data => {
        this.department = data;
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
    if(this.department.name=="")
      return false;
    else
      return true;
  }

  /**
   * 
   */
  create(): void{
    if(this.validateMandatoryData){
      this.departmentsService.create(this.department).subscribe(
        data => {
          Swal.fire(
            'Creado',
            'El departamento ha sido creado correctamente.',
            'success'
          );
          this.router.navigate(['pages/departamentos/listar']);
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
      delete this.department._id;
      this.departmentsService.edit(this.departmentId, this.department).subscribe(
        data => {
          Swal.fire(
            'Actualizado',
            'El departamento ha sido actualizado correctamente.',
            'success'
          );
          this.router.navigate(['pages/departamentos/listar']);
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Falla en el Servidor',
            text: 'El departamento no ha podido ser actualizado. Intente de nuevo.',
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
