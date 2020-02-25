function addContact() {
    $(".user-add-new-contact").bind("click", function (e) {
        let cId = $(this).data("uid")
        $.post("/users/contact/addNewContact", {
            cId: cId
        }, function (data) {
            if (data.success) {
                $("#find-user").find(`div.user-add-new-contact[data-uid = ${cId}]`).hide()
                $("#find-user").find(`div.user-remove-request-contact[data-uid = ${cId}]`).css("display", "inline-block")
                increaseRequestContact("count-request-contact-sent")
                socket.emit("add-new-contact", {
                    contactId: cId
                })
            }
        })
    })
}

socket.on("res-add-new-contact", function (dataUser) {
    let newNoti = `<span data-uid="${dataUser.id}">
    <img class="avatar-small"
        src="/images/users/${dataUser.avatar}" alt="">
    <strong>${dataUser.username}</strong> đã gửi lời mời kết bạn !
</span><br><br><br>`;
    $(".noti_content").prepend(newNoti)
    increaseRequestContact("count-request-contact-received")
    increaseCountRequestContact("noti_contact_counter")
    increaseCountRequestContact("noti_counter")
})