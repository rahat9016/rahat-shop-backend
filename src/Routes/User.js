const express = require("express");
const { requireSigning } = require("../Common-middleware/userMiddleware");
const { signup, signing, signOut } = require("../Controller/Admin/User");
const {
  validateSignupRequest,
  isRequestValidate,
  validateSigningRequest,
} = require("../Validator/User");
const router = express.Router();

router.post(
  "/admin/user/signup",
  validateSignupRequest,
  isRequestValidate,
  signup
);
router.post(
  "/admin/user/signing",
  validateSigningRequest,
  isRequestValidate,
  signing
);
router.post("/admin/user/signOut", requireSigning, signOut);

module.exports = router;
