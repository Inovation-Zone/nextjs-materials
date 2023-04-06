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

export const ADHESIVES_API = {
  createCategory: {
    name: 'category',
    api: '/category',
  },
  getAdhesives: {
    name: 'adhesives',
    api: '/adhesives',
  },
  getCategoryDetails: {
    name: (categoryId: string) => `/category/${categoryId}`,
    api: (categoryId: string) => `/category/${categoryId}`,
  },
}

export const WOOD_TYPES_API = {
  createCategory: {
    name: 'category',
    api: '/category',
  },
  getWoodTypes: {
    name: 'woodTypes',
    api: '/woodTypes',
  },
  getCategoryDetails: {
    name: (categoryId: string) => `/category/${categoryId}`,
    api: (categoryId: string) => `/category/${categoryId}`,
  },
}

export const THICKNESSES_API = {
  createCategory: {
    name: 'category',
    api: '/category',
  },
  getThicknesses: {
    name: 'thicknesses',
    api: '/thicknesses',
  },
  getCategoryDetails: {
    name: (categoryId: string) => `/category/${categoryId}`,
    api: (categoryId: string) => `/category/${categoryId}`,
  },
}

export const SIZES_API = {
  createCategory: {
    name: 'category',
    api: '/category',
  },
  getSizes: {
    name: 'sizes',
    api: '/sizes',
  },
  getCategoryDetails: {
    name: (categoryId: string) => `/category/${categoryId}`,
    api: (categoryId: string) => `/category/${categoryId}`,
  },
}

export const PRODUCT_API = {
  createProduct: {
    name: 'product',
    api: '/product',
  },
  getProducts: {
    name: 'products',
    api: '/products',
  },
  getProductDetails: {
    name: (productId: string) => `/product/${productId}`,
    api: (productId: string) => `/product/${productId}`,
  },
}

export const CATALOGS_API = {
  getCatalogsGroupByGroupId: {
    name: 'catalogsGroupByGroupId',
    api: '/catalogsGroupByGroupId',
  },
  getCatalogGroups: {
    name: 'groups',
    api: '/groups',
  },
  createCatalogGroup: {
    name: 'group',
    api: '/group',
  },
  deleteCatalogGroup: {
    name: (groupId: string) => `/group/${groupId}`,
    api: (groupId: string) => `/group/${groupId}`,
  },
  createCatalog: {
    name: 'catalog',
    api: '/catalog',
  },
  getCatalogs: {
    name: 'catalogs',
    api: '/catalogs',
  },
  deleteCatalog: {
    name: (catalogId: string) => `/catalog/${catalogId}`,
    api: (catalogId: string) => `/catalog/${catalogId}`,
  }
}

export const COLLECTIONS_API = {
  getCollectionsGroupByCollectionGroupId: {
    name: 'collectionsGroupByCollectionGroupId',
    api: '/collectionsGroupByCollectionGroupId',
  },
  getCollectionDetails: {
    name: (collectionId: string) => `/collection/${collectionId}`,
    api: (collectionId: string) => `/collection/${collectionId}`,
  },
  createCollectionGroup: {
    name: 'collectionGroup',
    api: '/collectionGroup',
  },
  createCollection: {
    name: 'collection',
    api: '/collection',
  },
  getCollectionGroups: {
    name: 'collectionGroups',
    api: '/collectionGroups',
  },
  getCollections: {
    name: 'collections',
    api: '/collections',
  },
  deleteCollectionGroup: {
    name: (collectionGroupId: string) => `/collectionGroup/${collectionGroupId}`,
    api: (collectionGroupId: string) => `/collectionGroup/${collectionGroupId}`,
  },
  deleteCollection: {
    name: (collectionId: string) => `/collection/${collectionId}`,
    api: (collectionId: string) => `/collection/${collectionId}`,
  }
}