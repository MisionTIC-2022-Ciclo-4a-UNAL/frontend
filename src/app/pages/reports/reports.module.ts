import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { StudentsComponent } from './students/students.component';
import { CoursesComponent } from './courses/courses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartmentComponent } from './department/department.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StudentsComponent,
    CoursesComponent,
    DepartmentComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class ReportsModule { }
