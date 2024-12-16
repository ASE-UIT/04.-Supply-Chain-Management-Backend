export enum MessageCode {
	USER_NOT_FOUND = 'Không tìm thấy thông tin người dùng',
	USER_NOT_REGISTER = 'Bạn chưa đăng ký dịch vụ, vui lòng liên hệ quản trị hệ thống để đăng ký',
	USER_IS_DELETED = 'Tài khoản đã bị khóa',
	USER_ALREADY_EXISTED = 'Tên người dùng đã tồn tại trong hệ thống',
	USER_CREATE_ERROR = 'Không thể đăng ký ngay lúc này',
	USER_PASSWORD_WRONG = 'Tên người dùng hoặc mật khẩu không chính xác',
	USER_NOT_HAVE_PERMISSION = 'Bạn không có quyền truy cập chức năng này',
	USER_INVALID_TOKEN = 'Token không hợp lệ hoặc đã hết hạn',

	UNKNOWN_ERROR = 'Lỗi không xác định',
	MISSING_REQUIRED_FIELD = "Thiếu thông tin bắt buộc",
	PLEASE_FILL_ALL_REQUIRED_FIELDS = 'Vui lòng điền đầy đủ thông tin',

	CANNOT_CREATE_WAREHOUSE = 'Không thể tạo thông tin kho lúc này',
	WAREHOUSE_ALREADY_EXISTED = 'Kho này đã tồn tại, hãy tạo kho khác',

	CANNOT_RETRIEVE_PRODUCTS = 'Không thể trích xuất sản phẩm',
	PRODUCT_NOT_FOUND = 'Không tìm thấy sản phẩm này',
	CANNOT_DELETE_PRODUCT = 'Không thể xóa sản phẩm này',

	LEGAL_PERSON_NOT_FOUND = 'Không tìm thấy thông tin người đại diện',
	CANNOT_CREATE_LEGAL_PERSON = 'Không thể tạo thông tin người đại diện lúc này',
	LEGAL_PERSON_ALREADY_EXISTED = 'Người đại diện này đã tồn tại, hãy tạo người đại diện khác',
	CANNOT_DELETE_LEGAL_PERSON = 'Không thể xóa người đại diện này',

	CANNOT_CREATE_PARTNER = 'Không thể tạo thông tin đối tác lúc này',
	PARTNER_ALREADY_EXISTED = 'Đối tác này đã tồn tại, hãy tạo đối tác khác',
	CANNOT_DELETE_PARTNER = 'Không thể xóa đối tác này',
	PARTNER_NOT_FOUND = 'Không tìm thấy đối tác này',
	INVALID_PARTNER_TYPE = 'Loại đối tác không hợp lệ',

	CANNOT_CREATE_ORDER = 'Không thể tạo đơn hàng lúc này',
	ORDER_NOT_FOUND = 'Không tìm thấy đơn hàng này',
	CANNOT_DELETE_ORDER = 'Không thể xóa đơn hàng này',
	ORDER_ALREADY_EXISTED = 'Đơn hàng này đã tồn tại, hãy tạo đơn hàng khác',

	CANNOT_CREATE_DRIVER = 'Không thể tạo thông tin tài xế lúc này',
	DRIVER_ALREADY_EXISTED = 'Tài xế này đã tồn tại, hãy tạo tài xế khác',
	CANNOT_DELETE_DRIVER = 'Không thể xóa tài xế này',
	DRIVER_NOT_FOUND = 'Không tìm thấy tài xế này',

	CANNOT_CREATE_VEHICLE = 'Không thể tạo thông tin xe lúc này',
	VEHICLE_ALREADY_EXISTED = 'Xe này đã tồn tại, hãy tạo xe khác',
	CANNOT_DELETE_VEHICLE = 'Không thể xóa xe này',
	VEHICLE_NOT_FOUND = 'Không tìm thấy xe này',

	CANNOT_CREATE_WAREHOUSE_EXPORT_ORDER = 'Không thể tạo thông tin xuất kho lúc này',
	WAREHOUSE_EXPORT_ORDER_NOT_FOUND = 'Không tìm thấy thông tin xuất kho này',
	CANNOT_DELETE_WAREHOUSE_EXPORT_ORDER = 'Không thể xóa thông tin xuất kho này',
	CANNOT_UPDATE_WAREHOUSE_EXPORT_ORDER = 'Không thể cập nhật thông tin xuất kho này',
	WAREHOUSE_NOT_FOUND = 'Không tìm thấy kho này',

	WAREHOUSE_EXPORT_ITEM_NOT_FOUND = 'Không tìm thấy thông tin sản phẩm xuất kho này',
	CANNOT_UPDATE_WAREHOUSE_CAPACITY = "Không thể cập nhật dung lượng kho vì dung lượng mới nhỏ hơn dung lượng khả dụng hiện tại",
    CUSTOMER_NOT_FOUND = "Không tìm thấy thông tin khách hàng",
    WAREHOUSE_EXPORT_ITEM_QUANTITY_INVALID = "Số lượng xuất không hợp lệ",
    CANNOT_APPROVE_WAREHOUSE_EXPORT_ORDER = "Không thể duyệt đơn xuất kho này",
    WAREHOUSE_EXPORT_ORDER_STATUS_INVALID = "WAREHOUSE_EXPORT_ORDER_STATUS_INVALID",
    ORDER_STATUS_INVALID = "ORDER_STATUS_INVALID",
}