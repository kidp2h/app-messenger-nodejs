import handleNotification from '../handleNotification/handleNotification';

let getMain =  async (req , res) => {
    // let allNotification = []
    let resultNotification = await handleNotification.getNotification(req.user._id)
    console.log(resultNotification);
    // let resultInfoUser = await 
    // resultNotification.forEach(noti => {
    //     allNotification.push(noti._doc)
    // });
    // console.log(allNotification);
    res.render("main/main",{
        errors: req.flash("errors"),
        success: req.flash("success"),
        user: req.user,
        resultNotification:resultNotification
    })
}
module.exports = {
    getMain:getMain
}
