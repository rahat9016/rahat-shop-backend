const User = require("../../Models/User");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res) => {
  try {
    await User.findOne({ email: req.body.email }).exec(async (error, user) => {
      if (error) return res.status(400).json({ error: "Something went wrong" });
      if (user) {
        res.status(200).json({ message: "Admin already registered!" });
      } else {
        const { firstName, lastName, email, password, number } = req.body;
        const hash_password = await bcrypt.hash(password, 10);
        const _newUser = new User({
          firstName,
          lastName,
          email,
          password: hash_password,
          number,
          userName: firstName + shortid.generate(),
          role: "admin",
        });
        _newUser.save((error, data) => {
          if (error) {
            res.status(400).json({ error: "Something went wrong ", error });
          } else if (data) {
            res.status(201).json({
              message: "Admin created successful",
              user: data,
            });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
//Signing page handler
exports.signing = async (req, res) => {
  try {
    await User.findOne({ email: req.body.email }).exec(async (error, user) => {
      if (error) return res.status(400).json({ error: error });
      if (user) {
        if (
          (await bcrypt.compare(req.body.password, user.password)) &&
          user.role === "admin"
        ) {
          const token = jwt.sign(
            {
              _id: user._id,
              role: user.role,
            },
            process.env.SECRET,
            {
              expiresIn: "1d",
            }
          );
          const { _id, firstName, lastName, role, email } = user;
          res.cookie("token", token, { expiresIn: "1d" });
          if (token) {
            res.status(200).json({
              token,
              user: {
                _id,
                firstName,
                lastName,
                email,
                role,
              },
            });
          }
        } else {
          res.status(400).json({
            error: "Invalid password!",
          });
        }
      } else {
        res.status(400).json({
          error: "This is not admin user",
        });
      }
    });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};
exports.signOut = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "Signout Successful!",
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};
