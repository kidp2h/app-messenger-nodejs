function addContact(){
    $(".user-add-new-contact").bind("click",function(e){
        let cId = $(this).data("uid")
        $.post("/users/contact/addNewContact", {cId:cId},function (data) {
            if(data.success){
                $("#find-user").find(`div.user-add-new-contact[data-uid = ${cId}]`).hide()
                $("#find-user").find(`div.user-remove-request-contact[data-uid = ${cId}]`).css("display","inline-block")
                let currentNumberNotify = +$(".count-request-contact-sent").find("em").text()
                currentNumberNotify += 1;
                if(currentNumberNotify === 0){
                    $(".count-request-contact-sent").find("em").text("")
                }else{
                    $(".count-request-contact-sent").find("em").text(currentNumberNotify)
                }
                socket.emit("add-new-contact",{contactId : cId})
            }
        })
    })
}
