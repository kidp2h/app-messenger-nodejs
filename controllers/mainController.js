let getMain = (req , res) => {
    res.render("main/main",{
        errors: req.flash("errors"),
        success: req.flash("success"),
        user: req.user
    })
}
module.exports = {
    getMain:getMain
}