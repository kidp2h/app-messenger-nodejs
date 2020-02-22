var newInfoUser = {}
var userAvatar = null;
var avatarSrc = null;
$(document).ready(function () {
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
            alertify.notify("Hãy điền đầy đủ thông tin trước khi cập nhật !!!", "error", 5)
        } else {
            console.log(avatarSrc);
            console.log(newInfoUser);
            console.log(userAvatar);
            $.ajax({
                type: "put",
                url: "/users/updateAvatar",
                cache: false,
                contentType: false,
                processData: false,
                data:userAvatar,
                success: function (response) {

                },
                error:function(err){
                    
                }
            });
        }

        e.preventDefault();
    });
    $("#cancelUpdate").bind("click", function (e) {
        newInfoUser = {};
        userAvatar = null;
    })

})