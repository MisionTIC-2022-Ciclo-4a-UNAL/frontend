import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  // application menu
  {
    title: 'SISTEMA ACADEMICO',
    group: true,
  },
  {
    title: 'Estudiantes',
    icon: 'home-outline',
    link: '/pages/estudiantes/listar',
  },
  {
    title: 'Departamentos',
    icon: 'home-outline',
    link: '/pages/departamentos/listar',
  },
  {
    title: 'Cursos',
    icon: 'home-outline',
    link: '/pages/cursos/listar',
  },
  {
    title: 'Inscripciones',
    icon: 'home-outline',
    link: '/pages/inscripciones/listar',
  },
  {
    title: 'Reportes',
    icon: 'layout-outline',
    children: [
      {
        title: 'General',
        link: '/pages/reportes/general',
      },
      {
        title: 'Estudiantes',
        link: '/pages/reportes/estudiantes',
      },
      {
        title: 'Departamentos',
        link: '/pages/reportes/departamentos',
      },
      {
        title: 'Cursos',
        link: '/pages/reportes/cursos',
      },
    ],
  },
  {
    title: 'ADMINISTRACION',
    group: true,
  },
  {
    title: 'Usuarios',
    icon: 'home-outline',
    link: '/pages/usuarios/listar',
  },
  {
    title: 'Roles',
    icon: 'home-outline',
    link: '/pages/roles/listar',
  },
];
