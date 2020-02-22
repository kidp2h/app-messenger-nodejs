import {check} from "express-validator/check"
import {transValidation} from "../lang/vi"

let validationUpdate = [
    check("username", transValidation.userUpdate)
    .optional()
    .isLength({min: 3, max: 17})
    .matches(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/),
    check("gender", transValidation.genderUpdate)
        .isIn(["male", "female"]),
    check("address", transValidation.passwordIncorrect)
        .isLength({ min: 3, max: 30}),
    check("phone",transValidation.confirmPasswordIncorrect).custom((value ,{req}) =>{
        return value === req.body.password
    })
];
module.exports = {
    validationUpdate: validationUpdate
}