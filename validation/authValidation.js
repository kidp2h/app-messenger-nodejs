import {check} from "express-validator/check"
import {transValidation} from "../lang/vi"

let register = [
    check("email", transValidation.emailIncorrect)
        .isEmail()
        .trim(),
    check("gender", transValidation.genderIncorrect)
        .isIn(["male", "female"]),
    check("password", transValidation.passwordIncorrect)
        .isLength({ min: 8})
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
    check("password_confirmation",transValidation.confirmPasswordIncorrect).custom((value ,{req}) =>{
        return value === req.body.password
    })
];
module.exports = {
    register: register
}