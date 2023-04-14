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
    fullName: 'Họ và tên',
    phone: 'Số điện thoại',
    contactAddress: 'Địa chỉ liên hệ',
    note: 'Ghi chú',
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
    continue: 'Tiếp tục',
    back: 'Quay lại',
    form: {
      required: 'Trường này là bắt buộc'
    },
    confirmDelete: (type: string) => `Bạn có muốn xoá [${type}] không?`,
    image: 'Hình ảnh',
    addAll: 'Thêm tất cả',
    buyMore: 'Mua thêm',
    quantity: 'Số lượng',
    detail: 'Chi tiết',
    content: 'Nội dung'
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
    ourProducts: 'Sản phẩm của chúng tôi',
    hidden: 'Ẩn sản phẩm',
    status: 'Còn hàng',
    orderNow: 'Đặt hàng ngay',
    outOfStock: 'Tạm hết hàng'
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
    },
    order: {
      add: 'Thêm sản phẩm vào giỏ hàng thành công',
      success: {
        createOrder: 'Tạo đơn hàng thành công.',
        changeStatus: 'Cập nhật trạng thái đơn hàng thành công.'
      },
      failed: {
        createOrder: 'Có lỗi khi tạo đơn hàng. Vui lòng thử lại',
        changeStatus: 'Có lỗi khi thay đổi trạng thái đơn hàng. Vui lòng thử lại'
      }
    },
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
  },
  cart: {
    title: 'Giỏ hàng',
    orders: 'Đơn hàng',
    customerInfo: 'Thông tin khách hàng',
    done: 'Hoàn thành',
    clearCart: 'Xoá tất cả',
    result: {
      title: 'Đơn đặt hàng của bạn đã được đặt thành công!',
      description: 'Đơn đặt hàng của bạn đang được xử lý và sẽ liên hệ với bạn trong vòng 1 đến 2 ngày làm việc tiếp theo.'
    }
  },
  order: {
    title: 'Quản lý đơn đặt hàng',
    code: 'Mã đơn hàng',
    status: 'Trạng thái',
    createdTime: 'Thời gian tạo đơn',
    customerInfo: 'Thông tin khách hàng',
    details: 'Chi tiết đơn hàng',
    clickToChangeStatus: 'Nhấn vào để thay đổi trạng thái đơn hàng',
    detail: {
      title: 'Chi tiết đơn hàng'
    },
    statusLabel: {
      new: 'Đơn mới',
      process: 'Đang xử lý',
      done: 'Hoàn thành',
      closed: 'Đóng'
    }
  },
  setting: {
    title: 'Cài đặt',
    general: {
      title: 'Tổng quan',
      logo: 'Logo',
      cover: 'Trang bìa',
      footer: 'Cuối trang'
    },
    about: {
      title: 'Giới thiệu'
    },
    contact: {
      title: 'Liên hệ'
    },
  }
}
