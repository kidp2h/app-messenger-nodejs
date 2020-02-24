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
                    let currentNumberNotify = +$(".count-request-contact-sent").find("em").text()
                    currentNumberNotify -= 1
                    if(currentNumberNotify === 0){
                        $(".count-request-contact-sent").find("em").html("")
                    }else{
                        $(".count-request-contact-sent").find("em").html(currentNumberNotify)
                    }
                }
            }
        });
    })
}