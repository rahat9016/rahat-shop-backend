const { check, validationResult } = require("express-validator");
const User = require("../Models/User");

exports.validateSignupRequest = [
  check("firstName").notEmpty().withMessage("First name is required").trim(),
  check("lastName").notEmpty().withMessage("Last name is required").trim(),
  check("email")
    .isEmail()
    .withMessage("Email is required")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("Email Already is use!");
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long")
    .matches(/\d/)
    .withMessage("Must contain a number"),
];
exports.validateSigningRequest = [
  check("email").isEmail().withMessage("Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long")
    .matches(/\d/)
    .withMessage("Must contain a number"),
];
exports.isRequestValidate = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};
