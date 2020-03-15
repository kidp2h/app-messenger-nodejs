function markReadAllNotifications(allNotifcation) {
	//let allNotifcation = ["5e6ba319a8ee990a9f4f03df","5e6ba30fa8ee990a9f4f03de","5e6ba2f9a8ee990a9f4f03dd","5e6ba2eda8ee990a9f4f03dc","5e6ba2cca8ee990a9f4f03db","5e6ba2c1a8ee990a9f4f03da","5e6ba2b8a8ee990a9f4f03d9","5e6ba2ada8ee990a9f4f03d8","5e6ba2a5a8ee990a9f4f03d7","5e6ba34ca8ee990a9f4f03e1"]

	$.ajax({
		url: '/users/notification/markReadAllNotification',
		type: 'post',
		data: {allNotifcation : JSON.stringify(allNotifcation)},
		success: (result) => {
			console.log(result);
			$(".noti_content").find("div.not-read").removeClass('not-read')
			$("ul.list-notifications").find("li>div.not-read").removeClass('not-read')
		}
	})
}
$(document).ready(function() {

    $(".markReadAll").bind("click", (e) => {
        let allNotifcation = []
        $(".noti_content").find("div.not-read").each(function(index, el) {
            allNotifcation.push($(el).data("uid"))
        });
        if (!allNotifcation) {
            alertify.notify("Bạn không còn thông báo nào", "info", 5)
        } else {
        	//console.log(allNotifcation);
        	//let allNotifcations = ["5e6ba319a8ee990a9f4f03df","5e6ba30fa8ee990a9f4f03de","5e6ba2f9a8ee990a9f4f03dd","5e6ba2eda8ee990a9f4f03dc","5e6ba2cca8ee990a9f4f03db","5e6ba2c1a8ee990a9f4f03da","5e6ba2b8a8ee990a9f4f03d9","5e6ba2ada8ee990a9f4f03d8","5e6ba2a5a8ee990a9f4f03d7","5e6ba34ca8ee990a9f4f03e1"]
        	markReadAllNotifications(allNotifcation)
        }
    })

    $(".markReadAll_modal").bind("click", (e) => {
        let allNotifcation = []
        $("ul.list-notifications").find("li>div.not-read").each(function(index, el) {
            allNotifcation.push($(el).data("uid"))
        });
        if (!allNotifcation) {
            alertify.notify("Bạn không còn thông báo nào", "info", 5)
        } else {
           markReadAllNotifications(allNotifcation)
        }
    })

});