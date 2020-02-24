function callFindUser(element){
    if(element.which == 13 || element.type === "click"){
        let keySearch = $("#input-search-contact").val()
        
        if(!keySearch){
            alertify.notify("Bạn phải nhập từ khoá để tìm kiếm", "error", 5)
            return false
        }else{
            let regEx =  keySearch.match(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/)
            if(regEx == null){
                alertify.notify("Từ khoá tìm kiếm không được chứa ký tự", "error", 5)
            return false
            }else{
                console.log(keySearch);
                $.get(`/users/contact/find-user/${keySearch}`,function(data){
                    console.log(data);
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