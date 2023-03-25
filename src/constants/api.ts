export const REQUEST_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

export const TOKEN = 'jwt-token';
export const USER_INFOS = 'userInfos';
export const API_BASE_URL = 'http://localhost:3600';

export const AUTH_API = {
  auth: {
    name: 'signin',
    api: '/signin',
  },
  logout: {
    name: 'signout',
    api: '/signout',
  },
}

export const FILE_API = {
  uploadFiles: {
    name: 'uploadFiles',
    api: '/uploadFiles',
  },
}

export const CATEGORIES_API = {
  createCategory: {
    name: 'category',
    api: '/category',
  },
  getCategories: {
    name: 'categories',
    api: '/categories',
  },
  getCategoryDetails: {
    name: (categoryId: string) => `/category/${categoryId}`,
    api: (categoryId: string) => `/category/${categoryId}`,
  },
}