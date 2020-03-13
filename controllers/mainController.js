import handleNotification from '../handleNotification/handleNotification';

let getMain =  async (req , res) => {
    let resultNotification = await handleNotification.getNotification(req.user._id)

    let countNotiUnRead = await handleNotification.getCountNotiUnRead(req.user._id)
    console.log(countNotiUnRead);
    res.render("main/main",{
        errors: req.flash("errors"),
        success: req.flash("success"),
        user: req.user,
        resultNotification:resultNotification,
        countNotiUnRead:countNotiUnRead
    })
}
module.exports = {
    getMain:getMain
}
