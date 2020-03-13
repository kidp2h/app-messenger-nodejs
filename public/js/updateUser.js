var newInfoUser = {}
var userAvatar = null;
var avatarSrc = null;
var passwordUser = {}

$(document).ready(function () {

    /* ---------------------------- update user info ---------------------------- */

    var originAvatar = $("#avatarUser").attr("src");
    var originInfoUser = {
        username: $("#input-update-username").val(),
        gender: ($("#input-update-gender-male").is(":checked")) ? $("#input-update-gender-male").val() : $("#input-update-gender-female").val(),
        address: $("#input-update-address").val(),
        phone: $("#input-update-phone").val(),
    }
    $(".alert-update-success").slideUp()
    $(".alert-update-error").slideUp();
    /* ---------------- preview image when user upload new image ---------------- */
    $("#input-change-avatar").bind("change", function () {
        let fileData = $(this).prop("files")[0]
        let extFile = ["image/png", "image/jpg", "image/jpeg"]
        let limitSize = 1048576
        if ($.inArray(fileData.type, extFile) === -1) {
            alertify.notify("Kiểu ảnh không hợp lệ . Chỉ chấp nhận file ảnh có đuôi [png, jpg, jpeg]", "error", 5)
            $(this).val(null)
            return false
        }
        if (fileData.size > limitSize) {
            alertify.notify("File có dung lượng quá mức cho phép. Chỉ chấp nhận file dưới 1 MB ", "error", 5)
            $(this).val(null)
            return false
        }
        if (typeof (FileReader) != undefined) {
            let imagePreview = $("#image-edit-profile")
            imagePreview.empty();
            let fileReader = new FileReader();
            fileReader.onload = function (file) {
                $("<img>", {
                    "src": file.target.result,
                    "class": "avatar img-circle",
                    "id": "avatarUpdate",
                    "alt": "avatar"
                }).appendTo(imagePreview);
            }
            imagePreview.show();
            fileReader.readAsDataURL(fileData)

            // init Form Data
            let formData = new FormData();
            formData.append("avatar", fileData)
            userAvatar = formData;

        } else {
            alertify.notify("Trình duyệt của bạn đã lỗi thời, hãy update trình duyệt của bạn", "error", 5)
            $(this).val(null)
            return false
        }
    })

    /* ----------------- get Value in input to update info user ----------------- */
    $("#input-update-username").bind("change", function (e) {
        let username = $(this).val()
        if (username.match(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/) == null || username < 3 || username > 17) {
            $(this).val(originInfoUser.username)
            alertify.notify("Tài khoản chỉ cho phép từ 3 đến 17 ký tự và không chứa ký tự đặc biệt !!", "error", 5)
            delete newInfoUser.username;
            return false
        }
        newInfoUser.username = username;
    });
    $("#input-update-gender-male").bind("click", function (e) {
        let gender = $(this).val()
        if (gender !== "male") {
            alertify.notify("Giới tính  phải là nam hoặc nữ", "error", 5)
            delete newInfoUser.gender;
            return false
        }
        newInfoUser.gender = gender;
    });
    $("#input-update-gender-female").bind("click", function (e) {
        let gender = $(this).val()
        if (gender !== "female") {
            alertify.notify("Giới tính  phải là nam hoặc nữ", "error", 5)
            delete newInfoUser.gender;
            return false
        }
        newInfoUser.gender = gender;
    });
    $("#input-update-address").bind("change", function (e) {
        let address = $(this).val();
        if (address.length < 3 || address.length > 30) {
            $(this).val(originInfoUser.address)
            alertify.notify("Địa chỉ không hợp lệ. Chỉ dài khoảng 3 đến 30 ký tự", "error", 5)
            delete newInfoUser.address;
            return false
        }
        newInfoUser.address = address;
    });
    $("#input-update-phone").bind("change", function (e) {
        let phone = $(this).val()
        if (phone.match(/^(0)[0-9]{9,10}$/) == null || phone.length < 10 || phone.length > 11) {
            $(this).val(originInfoUser.phone)
            alertify.notify("Số điện thoại không hợp lệ. Số điện thoại việt nam bắt đầu từ 0 và có độ dài 10-11 chữ số !!", "error", 5)
            delete newInfoUser.phone;
            return false
        }
        newInfoUser.phone = phone;
    });

    /* ----------------------- handle data when all right ----------------------- */

    $("#updateInfo").bind("click", function (e) {
        avatarSrc = $(".avatar").attr("src")
        console.log(avatarSrc);
        if ($.isEmptyObject(newInfoUser) == true && !userAvatar) {
            alertify.notify("Bạn phải upload ảnh hoặc thay đổi thông tin của bạn !!!", "error", 5)
        } else {
            if (userAvatar) {
                $.ajax({
                    type: "put",
                    url: "/users/updateAvatar",
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: userAvatar,
                    success: function (result) {
                        if (result.imageSource) {
                            alertify.notify("Cập nhật ảnh đại diện thành công", "success", 5)
                            let newAvatar = $("#avatarUser").attr("src", result.imageSource)
                            originAvatar = newAvatar
                        }
                    },
                    error: function (err) {
                        console.log(err);
                        $(".alert-update-error").slideDown("slow").find("span").text(err.responseText)
                        alertify.notify(err.responseText, "error", 5)
                        $("#cancelUpdate").click();
                        return false
                    }
                });
            }
            if (!$.isEmptyObject(newInfoUser)) {
                $.ajax({
                    type: "put",
                    url: "/users/updateInfoUser",
                    data: newInfoUser,
                    success: function (response) {
                        if (response.messageSuccess) {
                            $("#username-navbar").text(newInfoUser.username)
                            //$(".alert-update-success").slideDown().find("span").text(response.messageSuccess)
                            alertify.notify(response.messageSuccess, "success", 5)
                        }
                    },
                    error: function (err) {
                        arr = JSON.parse(err.responseText)
                        arr.forEach(element => {
                            alertify.notify(element, "error", 5)
                        });

                        $("#cancelUpdate").click();
                        return false
                    }
                });
            }

        }

        e.preventDefault();
    });

    /* ------------------------------- reset form ------------------------------- */

    $("#cancelUpdate").bind("click", function (e) {
        newInfoUser = {};
        userAvatar = null;
        $("#avatarUpdate").attr("src", originAvatar)
        $("#input-update-username").val(originInfoUser.username)
        if (originInfoUser.gender == "male") {
            $("#input-update-gender-male").click();
        } else {
            $("#input-update-gender-female").click();
        }
    })

    /* -------------------------- update password user -------------------------- */

    $("#input-current-password").bind("change", function (e) {
        let currentPassword = $(this).val()
        if (currentPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/) == null || currentPassword.length < 8) {
            $(this).val(null)
            alertify.notify("Mật khẩu ít nhất 8 ký tự, bao gồm chữ hoa, chữ số ,chữ thường và ký tự đặc biệt !!", "error", 5)
            delete passwordUser.currentPassword;
            return false
        }
        passwordUser.currentPassword = currentPassword;
    });
    $("#input-new-password").bind("change", function (e) {
        let newPassword = $(this).val()
        if (newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/) == null || newPassword.length < 8) {
            $(this).val(null)
            alertify.notify("Mật khẩu ít nhất 8 ký tự, bao gồm chữ hoa, chữ số ,chữ thường và ký tự đặc biệt !!", "error", 5)
            delete passwordUser.newPassword;
            return false
        }
        passwordUser.newPassword = newPassword;
    });
    $("#input-confirm-new-password").bind("change", function (e) {
        let confirmNewPassword = $(this).val()
        if (!passwordUser.newPassword) {
            $(this).val(null)
            alertify.notify("Bạn chưa nhập mật khẩu mới !!", "error", 5)
            delete passwordUser.confirmNewPassword;
            return false
        }
        if (passwordUser.newPassword !== confirmNewPassword) {
            $(this).val(null)
            alertify.notify("Nhập lại mật khẩu chưa chính xác !!", "error", 5)
            delete passwordUser.confirmNewPassword;
            return false
        }
        passwordUser.confirmNewPassword = confirmNewPassword;
    });

    $(".btn-update-password-user").bind("click", function (e) {
        if ($.isEmptyObject(passwordUser)) {
            alertify.notify("Bạn phải nhập đầy đủ trước khi nhấn nút này", "error", 5)
            return false
        } else {
            Swal.fire({
                title: 'Bạn có chắc chắn khi đổi mật khẩu không?',
                text: "Bạn không thể hoàn tác lại hành động này !!!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#2ECC71',
                cancelButtonColor: '#ff7675',
                confirmButtonText: 'Xác nhận'
            }).then((result) => {
                if (result.value) {
                    $.ajax({
                        type: "put",
                        url: "/users/updatePassword",
                        data: passwordUser,
                        success: function (result) {
                            if (result.type == "success") {
                                alertify.notify(result.messageSuccess, "success", 5)
                                Swal.fire(
                                    'Đã cập nhật',
                                    'Mật khẩu của bạn đã được thay đổi',
                                    'success'
                                )
                            } else {
                                alertify.notify(result.messageSuccess, "error", 5)
                                Swal.fire(
                                    'Oops!!',
                                    result.messageSuccess,
                                    'error'
                                )
                            }
                        },
                        error: function (err) {
                            arr = JSON.parse(err.responseText) //.split(",")
                            arr.forEach(element => {
                                alertify.notify(element, "error", 5)
                            });
        
                            $(".reset-modal-password").click();
                            return false
                        }
                    });
                }else{
                    $(".reset-modal-password").click()
                    return false
                }
            })
        }
    })
    $(".reset-modal-password").bind("click", function (e) {
        passwordUser = {}
        $("#input-current-password").val(null)
        $("#input-new-password").val(null)
        $("#input-confirm-new-password").val(null)


    })
})