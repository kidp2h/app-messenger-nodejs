import {check} from "express-validator/check"
import {transValidation} from "../lang/vi"

let validationUpdate = [
    check("username", transValidation.userUpdate)
        .optional()
        .isLength({min: 3, max: 17})
        .matches(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/),
    check("gender", transValidation.genderIncorrect)
        .optional()
        .isIn(["male", "female"]),
    check("address", transValidation.addressUpdate)
        .optional()
        .isLength({ min: 3, max: 30}),
    check("phone",transValidation.phoneUpdate)
        .optional()
        .matches(/^(0)[0-9]{9,10}$/)
];
module.exports = {
    validationUpdate: validationUpdate
}