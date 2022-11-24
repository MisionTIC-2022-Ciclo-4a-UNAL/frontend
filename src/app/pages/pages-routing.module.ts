import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    // Application modules
    {
      path: 'cursos',
      loadChildren: () => import('./courses/courses.module')
        .then(m => m.CoursesModule),
    },
    {
      path: 'departamentos',
      loadChildren: () => import('./departments/departments.module')
        .then(m => m.DepartmentsModule),
    },
    {
      path: 'reportes',
      loadChildren: () => import('./reports/reports.module')
        .then(m => m.ReportsModule),
    },
    {
      path: 'roles',
      loadChildren: () => import('./roles/roles.module')
        .then(m => m.RolesModule),
    },
    {
      path: 'seguridad',
      loadChildren: () => import('./security/security.module')
        .then(m => m.SecurityModule),
    },
    {
      path: 'estudiantes',
      loadChildren: () => import('./students/students.module')
        .then(m => m.StudentsModule),
    },
    {
      path: 'usuarios',
      loadChildren: () => import('./users/users.module')
        .then(m => m.UsersModule),
    },
    {
      path: 'inscripciones',
      loadChildren: () => import('./enrollments/enrollments.module')
        .then(m => m.EnrollmentsModule),
    },
    
    {
      path: '',
      redirectTo: 'estudiantes/listar',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
