import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  // application menu
  {
    title: 'ACADEMICO',
    group: true,
  },
  {
    title: 'Estudiantes',
    icon: 'edit-2-outline',
    link: '/pages/estudiantes/listar',
    home: true,
  },
  {
    title: 'Departamentos',
    icon: 'grid-outline',
    link: '/pages/departamentos/listar',
  },
  {
    title: 'Cursos',
    icon: 'map-outline',
    link: '/pages/cursos/listar',
  },
  {
    title: 'Inscripciones',
    icon: 'layout-outline',
    link: '/pages/inscripciones/listar',
  },
  {
    title: 'Reportes',
    icon: 'pie-chart-outline',
    children: [
      {
        title: 'Estudiantes',
        link: '/pages/reportes/estudiantes',
      },
      {
        title: 'Cursos',
        link: '/pages/reportes/cursos',
      },
      {
        title: 'Departamentos',
        link: '/pages/reportes/departamentos',
      },
    ],
  },
  {
    title: 'ADMINISTRACION',
    group: true,
  },
  {
    title: 'Usuarios',
    icon: 'browser-outline',
    link: '/pages/usuarios/listar',
  },
  {
    title: 'Roles',
    icon: 'lock-outline',
    link: '/pages/roles/listar',
  },
];
