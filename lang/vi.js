export const transValidation = {
    emailIncorrect: "Email phải có dạng example@example.com !!",
    genderIncorrect: "Giới tính  phải là nam hoặc nữ",
    passwordIncorrect: "Mật khẩu ít nhất 8 ký tự, bao gồm chữ hoa, chữ số ,chữ thường và ký tự đặc biệt",
    confirmPasswordIncorrect: "Nhập lại mật khẩu chưa chính xác",
    userUpdate: "Tài khoản chỉ cho phép từ 3 đến 17 ký tự và không chứa ký tự đặc biệt",
    addressUpdate: "Địa chỉ không hợp lệ. Chỉ dài khoảng 3 đến 30 ký tự",
    phoneUpdate : "Số điện thoại không hợp lệ. Số điện thoại việt nam bắt đầu từ 0 và có độ dài 10-11 chữ số"

}
export const transErrors = {
    emailExist: "Email này đã được sử dụng !!",
    unActive: "Tài khoản đã đăng ký nhưng chưa được kích hoạt !!",
    userDeleted: "Tài khoản đã bị gỡ bỏ, nếu có nhầm lẫn gì thì hãy liên hệ cho admin để được trợ giúp !!",
    errorActive: "Tài khoản chưa được kích hoạt, xin vui lòng kiểm tra lại",
    loginFailed: "Sai tài khoản hoặc mật khẩu !! . Xin vui lòng thử lại",
    fileSize: "File quá lớn. Vui lòng upload đúng file ảnh !!!",
    fileType: "Vui lòng upload đúng file ảnh. Hệ thống chỉ nhận file có đuôi [png, jpg, jpeg] !!!"
}
export const transSuccess = {
    registerSuccess: "Đăng ký thành công !! . Vui lòng kiểm tra mail để kích hoạt tài khoản",
    subject: "Messenger : Xác nhận tài khoản",
    htmlContent: (linkActive) => {
        return `<h1>Bạn nhận được email này để kích hoạt tài khoản trên ứng dụng Messenger</h1>
        <h2>Vui lòng click vào link ở bên dưới để kích hoạt tài khoản</h2>
        <h3><a href="${linkActive}" target"blank">${linkActive}</a></h3>`;

    },
    activeSuccess: "Tài khoản đã được kích hoạt, hãy thưởng thức ứng dụng chat trực tuyến <3",
    loginSuccess: "Đăng nhập thành công. Hãy thưởng thức ứng dụng chat trực tuyến",
    logoutSuccess: "Đăng xuất thành công !!",
    avatarUpdated: "Cập nhật avatar thành công !!!",
    infoUpdated: "Cập nhật thông tin thành công !!"
}