
var newInfoUser = {}
var userAvatar = null;
var avatarSrc = null;

$(document).ready(function () {
    var originAvatar = $("#avatarUser").attr("src");
    var originInfoUser = {
        username: $("#input-update-username").val(),
        gender: ($("#input-update-gender-male").is(":checked")) ? $("#input-update-gender-male").val() : $("#input-update-gender-female").val(),
        address: $("#input-update-address").val(),
        phone: $("#input-update-phone").val(),
    }
    console.log(originInfoUser)
    console.log(originAvatar)
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
        newInfoUser.username = $(this).val();
    });
    $("#input-update-gender-male").bind("click", function (e) {
        newInfoUser.gender = $(this).val();
    });
    $("#input-update-gender-female").bind("click", function (e) {
        newInfoUser.gender = $(this).val();
    });
    $("#input-update-address").bind("change", function (e) {
        newInfoUser.address = $(this).val();
    });
    $("#input-update-phone").bind("change", function (e) {
        newInfoUser.phone = $(this).val();
    });

    $("#updateInfo").bind("click", function (e) {
        avatarSrc = $(".avatar").attr("src")
        console.log(avatarSrc);
        if ($.isEmptyObject(newInfoUser) == true && !userAvatar) {
            alertify.notify("Bạn phải upload ảnh hoặc thay đổi thông tin của bạn !!!", "error", 5)
        } else {
            if(userAvatar){
                $.ajax({
                    type: "put",
                    url: "/users/updateAvatar",
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: userAvatar,
                    success: function (result) {
                        if (result.imageSource) {
                            alertify.notify("Update thành công", "success", 5)
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
            if(!$.isEmptyObject(newInfoUser)){
                $.ajax({
                    type: "put",
                    url: "/users/updateInfoUser",
                    data: newInfoUser,
                    success: function (response) {
                        if(response.messageSuccess){
                            $("#username-navbar").text(newInfoUser.username)
                            $(".alert-update-success").slideDown().find("span").text(response.messageSuccess)
                            alertify.notify(response.messageSuccess, "success", 5)
                        }
                    },
                    error: function (err) {
                        
                        alertify.notify(err.responseText, "error", 5)
                        $("#cancelUpdate").click();
                        return false
                    }
                });
            }
            
        }

        e.preventDefault();
    });
    $("#cancelUpdate").bind("click", function (e) {
        newInfoUser = {};
        userAvatar = null;
        $("#avatarUpdate").attr("src",originAvatar)
        $("#input-update-username").val(originInfoUser.username)
        if(originInfoUser.gender == "male"){
            $("#input-update-gender-male").click();
        }else{
            $("#input-update-gender-female").click();
        }
    })

})