export const REQUEST_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

export const TOKEN = 'jwt-token';
export const USER_INFOS = 'userInfos';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
  createAdhesive: {
    name: 'adhesive',
    api: '/adhesive',
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
  createWoodType: {
    name: 'woodType',
    api: '/woodType',
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
  createThickness: {
    name: 'thickness',
    api: '/thickness',
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
  createSize: {
    name: 'size',
    api: '/size',
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

export const CUSTOMER_ORDER_API = {
  createCustomerOrder: {
    name: 'customerOrder',
    api: '/customerOrder',
  },
  getCustomerOrders: {
    name: 'customerOrders',
    api: '/customerOrders',
  },
  getCustomerOrderDetails: {
    name: (customerOrderId: string) => `/customerOrder/${customerOrderId}`,
    api: (customerOrderId: string) => `/customerOrder/${customerOrderId}`,
  }
}

export const SETTINGS_API = {
  createSettings: {
    name: 'settings',
    api: '/settings',
  },
  getSettings: {
    name: 'settings',
    api: '/settings',
  },
}