let renderMain = (req , res) => {
    res.render("main/main",{
        errors: req.flash("errors"),
        success: req.flash("success")
    })
}
module.exports = renderMain;