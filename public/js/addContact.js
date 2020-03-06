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
    let newNoti = `<div class="not-read" data-uid="${dataUser.id}">
    <img class="avatar-small"
        src="/images/users/${dataUser.avatar}" alt="">
    <strong>${dataUser.username}</strong> đã gửi cho bạn một lời mời kết bạn
</div>`;
    $(".noti_content").prepend(newNoti)
    $("ul.list-notifications").prepend(`<li>${newNoti}</li>`)
    increaseRequestContact("count-request-contact-received")
    increaseCountRequestContact("noti_contact_counter")
    increaseCountRequestContact("noti_counter")
})