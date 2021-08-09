const User = require("../models/User");

// Register
exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await User.create({ username, email, password });
    res.status(201).json({ success: true, newUser });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};

// Login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({
      success: false,
      error: "Please provide either email or password",
    });
  }

  try {
    const user = await User.findOne({ email }).select("password");

    if (!user) {
      res.status(404).json({ success: false, error: "Invalid Credentials" });
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      res.status(404).json({ sucess: false, error: "Invalid Credentials" });
    }

    res.status(200).json({ success: true, user, token: "123123" });
  } catch (err) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Forget Password
exports.forgotPassword = (req, res, next) => {
  res.send("ForgotPassword routes");
};

// Reset Password
exports.resetPassword = (req, res, next) => {
  res.send("ResetPassword routes");
};
