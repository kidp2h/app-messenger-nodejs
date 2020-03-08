function removeRequestAddContact(){
    $(".user-remove-request-contact").bind("click",function(e){
        let uid = $(this).data("uid")
        $.ajax({
            type: "delete",
            url: "/users/contact/removeRequestContact",
            data: {uid:uid},
            success: function (data) {
                if(data.success){
                    $("#find-user").find(`div.user-add-new-contact[data-uid = ${uid}]`).css("display","inline-block")
                    $("#find-user").find(`div.user-remove-request-contact[data-uid = ${uid}]`).hide()
                    decreaseRequestContact("count-request-contact-sent")
                    socket.emit("remove-contact", {
                        contactId: uid
                    })
                }
            }
        });
    })
}
socket.on("res-remove-contact", function (dataUser) {
    $(".noti_content").find(`div[data-uid = ${dataUser.id}]`).remove()
    $("ul.list-notifications").find(`li>div[data-uid = ${dataUser.id}]`).parent().remove()
    decreaseRequestContact("count-request-contact-received")
    decreaseCountRequestContact("noti_contact_counter")
    decreaseCountRequestContact("noti_counter")
})