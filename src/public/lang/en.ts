// eslint-disable-next-line import/no-anonymous-default-export
export default {
  home: {
    title: 'Home',
  },
  common: {
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
    updateBtn: 'Update',
    cancelBtn: 'Cancel',
    filter: 'Filter',
    tipRemoveImage: 'Click on image to change it',
    form: {
      required: 'This field is required'
    },
    confirmDelete: (type: string) => `Do you want to delete this [${type}]?`
  },
  categories: {
    title: 'Categories Management',
    add: 'Add Category',
    edit: 'Edit Category',
  },
  products: {
    title: 'Products Management',
    viewDetailBtn: 'Edit',
    add: 'Create New Product',
    edit: 'Edit Product',
    delete: 'Delete',
  }
}
