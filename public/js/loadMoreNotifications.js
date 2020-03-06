$(document).ready(function () {
    $(".loadMore_modal").bind("click", function (e) {
        var index = $("ul.list-notifications").find("li").length
        $(".loadMore_modal").css("display","none")
        $.ajax({
            type: "GET",
            url: `/users/notification/loadMoreNotification?index=${index}`,
            success: function (response) {
                // console.log(response);
                // console.log(typeof response);
                if(!response.resultLoadMore.length){
                    alertify.notify("Bạn không còn thông báo nào nữa", "error", 5)
                    $(".loadMore_modal").css("display","block")
                }
                response.resultLoadMore.forEach(element => {
                    $("ul.list-notifications").append(`<li>${element}</li>`)
                    $(".loadMore_modal").css("display","block")
                });
            }
        });
        //console.log(skipNumber);
    });
});