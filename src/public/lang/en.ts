// eslint-disable-next-line import/no-anonymous-default-export
export default {
  home: {
    title: 'Home',
  },
  common: {
    yes: "Yes",
    no: "No",
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
  }
}
