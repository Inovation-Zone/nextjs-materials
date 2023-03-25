import dynamic from 'next/dynamic';

const Home = dynamic(() => import('@/pages/home'));
const About = dynamic(() => import('@/pages/about'));
const Product = dynamic(() => import('@/pages/dashboard/product'));

export interface Route {
  path: string;
  roles: string[];
  auth: boolean;
  component: React.ComponentType<any>;
  routes?: Route[];
  params?: any;
}

export const routes: Route[] = [
  {
    path: '/',
    roles: ['all'],
    auth: false,
    component: Home,
  },
  {
    path: '/login',
    roles: ['all'],
    auth: false,
    component: Home,
  },
  {
    path: '/forgot-password',
    roles: ['all'],
    auth: false,
    component: Home,
  },
  {
    path: '/dashboard',
    roles: ['admin'],
    auth: false,
    component: About,
    routes: [
      {
        path: '/product',
        roles: ['admin'],
        auth: false,
        component: Product,
        routes: [
          {
            path: '/:productId',
            roles: ['admin'],
            auth: false,
            component: Product,
          },
          {
            path: '/categories',
            roles: ['admin'],
            auth: false,
            component: About,
          },
        ]
      },
      {
        path: '/chart',
        roles: ['admin'],
        auth: false,
        component: About,
      },
      {
        path: '/statistics',
        roles: ['admin'],
        auth: false,
        component: About,
      },
    ],
  },
  {
    path: '/about',
    roles: ['all'],
    auth: false,
    component: About,
  },
];