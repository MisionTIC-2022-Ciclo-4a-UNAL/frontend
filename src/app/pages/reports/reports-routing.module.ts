import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { DepartmentComponent } from './department/department.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  {
    path: 'estudiantes',
    component: StudentsComponent,
  },
  {
    path: 'cursos',
    component: CoursesComponent,
  },
  {
    path: 'departamentos',
    component: DepartmentComponent,
  },
  {
    path: 'general',
    component: DashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
