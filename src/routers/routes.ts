
export interface Route {
  path: string;
  roles: string[];
  auth: boolean;
  routes?: Route[];
}

export const routes: Route[] = [
  {
    path: '/',
    roles: ['all'],
    auth: false,
  },
  {
    path: '/login',
    roles: ['all'],
    auth: false,
  },
  {
    path: '/forgot-password',
    roles: ['all'],
    auth: false,
  },
  {
    path: '/product/details',
    roles: ['admin'],
    auth: false,
  },
  {
    path: '/dashboard',
    roles: ['admin'],
    auth: true,
    routes: [
      {
        path: '/product',
        roles: ['admin'],
        auth: false,
        routes: [
          {
            path: '/:productId',
            roles: ['admin'],
            auth: false,
          },
          {
            path: '/categories',
            roles: ['admin'],
            auth: false,
          },
          {
            path: '/add',
            roles: ['admin'],
            auth: false,
          },
          {
            path: '/woodTypes',
            roles: ['admin'],
            auth: false,
          },
        ]
      },
      {
        path: '/chart',
        roles: ['admin'],
        auth: false,
      },
      {
        path: '/statistics',
        roles: ['admin'],
        auth: false,
      },
    ],
  },
  {
    path: '/about',
    roles: ['all'],
    auth: false,
  },
];