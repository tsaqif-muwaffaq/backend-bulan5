import { body } from "express-validator";
export const createProfileValidation = [
    body("name").notEmpty(),
    body("gender").isIn(["male", "female"]),
    body("address").notEmpty(),
    body("user_id").isInt()
];
export const updateProfileValidation = [
    body("name").optional().notEmpty(),
    body("gender").optional().isIn(["male", "female"]),
    body("address").optional().notEmpty(),
    body("profile_picture_url").optional().isURL()
];
//# sourceMappingURL=profile.validation.js.map