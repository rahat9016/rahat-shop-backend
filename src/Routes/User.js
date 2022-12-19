const express = require("express");
const {
  requireSigning,
  userMiddleware,
} = require("../Common-middleware/userMiddleware");
const { signup, signing, signOut } = require("../Controller/Admin/User");
const { Signup, Signing } = require("../Controller/auth");
const { createOrder } = require("../Controller/order");
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

// User Signup & Signing
router.post("/user/signup", validateSignupRequest, isRequestValidate, Signup);
router.post(
  "/user/signing",
  validateSigningRequest,
  isRequestValidate,
  Signing
);

module.exports = router;
