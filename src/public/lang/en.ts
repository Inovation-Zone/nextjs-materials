// eslint-disable-next-line import/no-anonymous-default-export
export default {
  home: {
    title: 'Home',
  },
  common: {
    home: 'Home',
    login: 'Login',
    logout: 'Logout',
    all: 'All',
    search: 'Search',
    yes: "Yes",
    no: "No",
    addNew: 'Add New',
    edit: 'Edit',
    name: 'Name',
    confirm: 'Confirm',
    description: 'Description',
    thumbnail: 'Thumbnail',
    actions: 'Actions',
    createBtn: 'Create',
    editBtn: 'Edit',
    deleteBtn: 'Delete',
    saveBtn: 'Save',
    updateBtn: 'Update',
    cancelBtn: 'Cancel',
    filter: 'Filter',
    email: 'Email',
    password: 'Password',
    backToHome: 'Back To Home',
    tipRemoveImage: 'Click on image to change it',
    reset: 'Reset',
    form: {
      required: 'This field is required'
    },
    confirmDelete: (type: string) => `Do you want to delete this [${type}]?`,
    image: 'Images',
    addAll: 'Add all'
  },
  table: {
    collection: {
      name: 'Name',
      color: 'Color',
      code: 'Code',
      size: 'Size',
      surface: 'Surface',
      group: 'Group'
    },
    catalog: {
      viName: 'Name (Vietnamese)',
      enName: 'Name (English)',
      group: 'Group'
    },
  },
  categories: {
    name: 'Category',
    title: 'Categories Management',
    add: 'Add Category',
    edit: 'Edit Category',
  },
  products: {
    name: 'Product',
    title: 'Products Management',
    viewDetailBtn: 'Edit',
    add: 'Create New Product',
    edit: 'Edit Product',
    delete: 'Delete',
    ourProducts: 'Our Products'
  },
  catalog: {
    title: 'Catalog Management',
    name: 'Catalog',
    add: 'Create catalog',
    edit: 'Edit catalog',
    thumbnail: 'Thumbnail',
    targetFile: 'File content (DPF File)',
    group: {
      title: 'Group Catalog Management',
      name: 'Group',
      add: 'Create new group',
      edit: 'Edit group'
    }
  },
  collection: {
    title: 'Collections Management',
    name: 'Collection',
    add: 'Create collection',
    edit: 'Edit collection',
    image: 'Image',
    group: {
      title: 'Group Collection Management',
      name: 'Group',
      add: 'Create new group',
      edit: 'Edit group'
    }
  },
  woodTypes: {
    name: 'Wood Types',
  },
  adhesives: {
    name: 'Adhesives'
  },
  thicknesses: {
    name: 'Thicknesses',
  },
  sizes: {
    name: 'Sizes',
  },
  menus: {
    aboutUs: 'About Us',
    products: 'Products',
    collections: 'Collections',
    catalog: 'Catalog',
    news: 'News',
    contacts: 'Contacts',
    inquiry: 'Inquiry'
  },
  collections: {
    colorName: 'Color Name',
    code: 'Code',
    surfaceTexture: 'Surface Texture',
    size: 'Size'
  },
  messageToast: {
    form: {
      success: {
        add: 'Item successfully added.',
        update: 'Item successfully updated.',
        delete: 'Item successfully deleted.',
      },
      failed: {
        add: 'Failed to add item. Please try again later',
        update: 'Failed to update item. Please try again later',
        delete: 'Failed to delete item. Please try again later',
      }
    },
    auth: {
      failed: {
        logout: 'Logout failed. Please try again.'
      }
    }
  },
  login: {
    title: 'Login',
    rememberMe: 'Remember password',
    forgotPassword: 'Forgot password?',
    enterYourEmail: 'Enter your email',
    enterYourPassword: 'Enter your password'
  },
  forgotPassword: {
    title: 'Reset Password',
    enterYourEmail: 'Enter your email'
  }
}
