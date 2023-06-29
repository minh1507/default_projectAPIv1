const message = {
    PARAM_NOT_FOUND: "param not found",
    INVALID_BODY_VALUE: "Invalid parameter",
    SERVER_ERROR: "Server error",
    
    SUCCESS: "Thực thi thành công",

    ACCOUNT_NOT_FOUND: "Tài khoản không tồn tại", 
    ACOUNT_WRONG_ATTRIBURE: "Tài khoản không trùng khớp với dữ liệu", 
    REFRESH_TOKEN_WRONG_ATTRIBUTE: "Refresh token không trùng khớp với dữ liệu",
    WRONG_ACCOUNT_EMPTY: "Tài khoản không được để trống",
    CREATE_ACCOUNT_SUCCESS: "Tạo tài khoản thành công",
    DUBLICATE_RECORD_ACCOUNT: "Tài khoản đã tồn tại",
    NOT_DUBLICATE_RECORD_ACCOUNT: "Tài khoản này không tồn tại",
    ACCOUNT_LENGTH_INVALID: "Tài khoản phải trong khoảng từ 8 đến 20 ký tự",

    FIRST_NAME_EMPTY: "Họ không được để trống",
    LAST_NAME_EMPTY: "Tên không được để trống",

    WRONG_PASSWORD_MATCH: "Mật khẩu phải từ 8 đến 20 ký tự, ít nhất 1 ký tự in hoa, 1 ký tự đặc biệt và 1 số",
    WRONG_PASSWORD_EMPTY: "Mật khẩu không được để trống",
    WRONG_PASSWORD_COMPARE: "Sai mật khẩu",
    
    WRONG_ROLE_ID: "Id quyền hạn không được để trống và phải là số",
    WRONG_ROLE_ID_NUMERIC: "Id quyền hạn phải là số",
    WRONG_ROLE_ID_EMPTY: "Id quyền hạn không được để trống",
    WRONG_ROLE_ID_NOT_EXIST: "Id quyền hạn không tồn tại dữ liệu có sẵn",

    WRONG_GENDER_ID_EMPTY: "Id giới tính không được để trống",
    WRONG_GENDER_ID_NUMERIC: "Id giới tính phải là số",
    WRONG_GENDER_ID_NOT_EXIST: "Id giới tính không tồn tại dữ liệu có sẵn",

    WRONG_ADDRESS_ID_EMPTY: "Id địa chỉ không được để trống",
    WRONG_ADDRESS_ID_NUMERIC: "Id địa chỉ phải là số",
    WRONG_ADDRESS_ID_NOT_EXIST: "Id địa chỉ không tồn tại dữ liệu có sẵn",
   
    WRONG_USERNAME_REFRESHTK: "Username or refresh token not found",
    WRONG_REFRESH_TOKEN: "Refresh token not found", 

    LOGIN_SUCCESS: "Đăng nhập thành công",

    TOKEN_HANDLE_EXPIRE_SUCCESS: "Xử lý token hết hạn thành công",

    ACCEPT_ACESS: "Quyền truy cập",

    LOG_OUT: "Thoát thành công",

    ACCEPTED: "Cho phép truy cập",
    NOT_ACCEPT: 'Không cho phép truy cập',

    DATE_IS_EMPTY: "Ngày không được để trống",
    DATE_IS_INVALID: "Ngày không hợp lệ",

    EMAIL_IS_EMPTY: "Email không được để trống",
    EMAIL_IS_INVALID: "Email không hợp lệ",
    WRONG_EMAIL_IS_EXIST: "Email đã tồn tại",

    MAIL_SENT_SUCCESS: "Gửi mã xác nhận thành công",
    ACCOUNT_ACTIVE: "Kích hoạt tài khoản thành công",
    ACCOUNT_ACTIVE_FAILED: "Kích hoạt tài khoản thất bại",

    CODE_IS_EMPTY: "Mã trống",
    CODE_IS_INVALID: "Mã không hợp lệ",

    CODE_RECIEVE: "Mã xác nhận của bạn là"
}

export default message