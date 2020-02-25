function callFindUser(element){
    if(element.which == 13 || element.type === "click"){
        let keySearch = $("#input-search-contact").val()
        
        if(!keySearch){
            alertify.notify("Bạn phải nhập từ khoá để tìm kiếm", "error", 5)
            return false
        }else{
            let regEx =  keySearch.match(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/)
            if(regEx == null){
                alertify.notify("Từ khoá tìm kiếm không được chứa ký tự đặc biệt", "error", 5)
            return false
            }else{
                $.get(`/users/contact/find-user/${keySearch}`,function(data){
                    if(Array.isArray(data) == true){
                        alertify.notify(data[0], "error", 5)
                    }
                    $("#find-user ul").html(data)
                    
                })
            }
        }
    }
}

$(document).ready(function () {
    $("#submit-search").bind("keypress",callFindUser)

    $("#submit-search").bind("click",callFindUser)
});