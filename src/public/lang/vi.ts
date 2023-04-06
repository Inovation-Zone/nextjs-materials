// eslint-disable-next-line import/no-anonymous-default-export
export default {
  home: {
    title: 'Trang chủ',
  },
  common: {
    home: 'Trang chủ',
    login: 'Đăng nhập',
    logout: 'Đăng xuất',
    all: 'Tất cả',
    search: 'Tìm kiếm',
    yes: "Đồng ý",
    no: "Không",
    addNew: 'Tạo mới',
    edit: 'Chỉnh sửa',
    name: 'Tên',
    confirm: 'Xác nhận',
    description: 'Mô tả',
    thumbnail: 'Hình ảnh',
    actions: 'Hành động',
    createBtn: 'Tạo',
    editBtn: 'Sửa',
    deleteBtn: 'Xoá',
    saveBtn: 'Lưu',
    updateBtn: 'Cập nhật',
    cancelBtn: 'Huỷ bỏ',
    filter: 'Lọc',
    email: 'Email',
    password: 'Mật khẩu',
    backToHome: 'Quay về trang chủ',
    tipRemoveImage: 'Nhấn vào hình ảnh để xoá và chọn ảnh mới',
    reset: 'Khởi tạo',
    form: {
      required: 'Trường này là bắt buộc'
    },
    confirmDelete: (type: string) => `Bạn có muốn xoá [${type}] không?`,
    image: 'Hình ảnh',
    addAll: 'Thêm tất cả',
  },
  table: {
    collection: {
      name: 'Tên',
      color: 'Màu',
      code: 'Mã',
      size: 'Kích thước',
      surface: 'Bề mặt',
      group: 'Nhóm'
    },
    catalog: {
      viName: 'Tên (Vietnamese)',
      enName: 'Tên (English)',
      group: 'Nhóm'
    },
  },
  categories: {
    name: 'Danh mục',
    title: 'Quản lý danh mục',
    add: 'Thêm danh mục',
    edit: 'Sửa danh mục'
  },
  products: {
    name: 'Sản phẩm',
    title: 'Quản lý sản phẩm',
    viewDetailBtn: 'Chỉnh sửa',
    add: 'Tạo mới sản phẩm',
    edit: 'Sửa sản phẩm',
    delete: 'Xoá',
    ourProducts: 'Sản phẩm của chúng tôi'
  },
  catalog: {
    title: 'Quản lý mục lục',
    name: 'Mục lục',
    add: 'Tạo mục lục',
    edit: 'Sửa mục lục',
    thumbnail: 'Hình bìa',
    targetFile: 'Tệp nội dung (Tệp DPF)',
    group: {
      title: 'Quản lý nhóm',
      name: 'Nhóm',
      add: 'Tạo nhóm',
      edit: 'Sửa nhóm'
    }
  },
  collection: {
    title: 'Quản lý bộ sưu tập',
    name: 'Bộ sưu tập',
    add: 'Tạo bộ sưu tập',
    edit: 'Sửa bộ sưu tập',
    image: 'Hình ảnh',
    group: {
      title: 'Quản lý nhóm',
      name: 'Nhóm',
      add: 'Tạo nhóm',
      edit: 'Sửa nhóm'
    }
  },
  woodTypes: {
    name: 'Loại gỗ',
  },
  adhesives: {
    name: 'Keo dính'
  },
  thicknesses: {
    name: 'Độ dày',
  },
  sizes: {
    name: 'Kích thước',
  },
  menus: {
    aboutUs: 'Về chúng tôi',
    products: 'Sản phẩm',
    collections: 'Bộ sưu tập',
    catalog: 'Mục lục',
    news: 'Tin tức',
    contacts: 'Liên hệ',
    inquiry: 'Đặt hàng'
  },
  collections: {
    colorName: 'Màu sắc',
    code: 'Mã',
    surfaceTexture: 'Bề mặt',
    size: 'Kích thước'
  },
  messageToast: {
    form: {
      success: {
        add: 'Tạo mới thành công.',
        update: 'Cập nhật thành công.',
        delete: 'Xoá thành công.',
      },
      failed: {
        add: 'Có lỗi khi tạo mới. Vui lòng thử lại',
        update: 'Có lỗi khi cập nhật. Vui lòng thử lại',
        delete: 'Có lỗi khi xoá. Vui lòng thử lại',
      }
    },
    auth: {
      failed: {
        logout: 'Logout failed. Please try again.'
      }
    }
  },
  login: {
    title: 'Đăng nhập',
    rememberMe: 'Ghi nhớ mật khẩu',
    forgotPassword: 'Quên mật khẩu?',
    enterYourEmail: 'Nhập email',
    enterYourPassword: 'Nhập mật khẩu'
  },
  forgotPassword: {
    title: 'Cấp lại mật khẩu',
    enterYourEmail: 'Nhập email',
  }
}
