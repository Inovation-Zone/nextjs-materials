import { useRouter } from 'next/router';
import { pathToRegexp } from 'path-to-regexp';
import { ReactNode, useEffect, useState } from 'react';

import { Route, routes } from '@/routers/routes';

interface AuthRoleWrapperProps {
  children: ReactNode;
}

const AuthRoleWrapper = ({ children }: AuthRoleWrapperProps) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const user = {
    roles: ['admin'], // replace with actual user roles
    hasPermission: (path: string, roles: string[]) => {
      // replace with actual permission logic
      return roles.includes('all') || roles.some(role => user.roles.includes(role));
    }
  }


  const findMatchingRoute = (pathname: string, routes: Route[]): Route | undefined => {
    for (const route of routes) {
      const keys: any[] = [];
      const pattern = route.path === '*' ? '(.*)' : route.path;
      const regex = pathToRegexp(pattern, keys);

      const match = regex.exec(pathname);
      if (match) {
        const params: any = {};
        keys.forEach((key, index) => {
          params[key.name] = match[index + 1];
        });
        return { ...route, params };
      }

      if (route.routes) {
        const prefix = route.path === '/' ? '' : route.path;
        const nestedPathname = pathname.replace(prefix, '');
        const matchingChildRoute = findMatchingRoute(nestedPathname, route.routes);
        if (matchingChildRoute) {
          return matchingChildRoute;
        }
      }
    }

    return undefined;
  };

  if (!isClient) {
    // Return null when running on the server-side
    return null;
  }

  const currentRoute = findMatchingRoute(router.pathname, routes);

  // if no matching route is found, redirect to the 404 page
  if (!currentRoute) {
    router.push('/404');
    return null;
  }

  const { roles, auth } = currentRoute;

  // if the route requires authentication and the user is not authenticated, redirect to the login page
  if (auth) {
    router.push('/login');
    return null;
  }

  // if the route requires specific roles and the user doesn't have them, redirect to the login page
  if (roles && !user.hasPermission(router.pathname, roles)) {
    router.push('/permission');
    return null;
  }

  // otherwise, render the component
  return <>{children}</>;
};

export default AuthRoleWrapper;
