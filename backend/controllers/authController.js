const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();

// Function to register a new user
const Register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if all fields are present
    if (!username || !password || !email) {
      return res.status(422).json({ errors: [{ msg: "Missing data" }] });
    }

    if (!validator.isEmail(email)) {
      return res.status(422).json({ errors: [{ msg: "Invalid email" }] });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(422).json({ errors: [{ msg: "Weak password" }] });
    }

    // Check if user with the same email already exists
    const newUser = await User.findOne({ email });
    if (newUser) {
      return res
        .status(403)
        .send({ auth: false, message: "Email already exists." });
    }
    const tokenPayload = {
      username,
      email,
      password
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_ACC_ACTIVATE, {
      expiresIn: "20m",
    });

    // Create a reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send verification email with JWT token
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
     html: `Click <a href="${req.protocol}://${req.get('host')}/auth/verify-email/${token}">here</a> to verify your email.`
    });

    res
      .status(201)
      .json({ message: "Please verify your email to complete registration." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.body;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_ACC_ACTIVATE);
      const { username, email, password } = decodedToken;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res
          .status(400)
          .json({ error: "User with this email already exists." });
      }

      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        password: hashedPassword,
        email,
      });
      await user.save();

      res
        .status(200)
        .json({ id: user._id,username: user.username, email: user.email,role: user.role ,token });
    } catch (error) {
      console.error("Error in signup while account activation: ", error);
      return res.status(400).json({ error: "Incorrect or Expired link." });
    }
  }
};

// Function to authenticate user login
const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(409).json({ msg: "Invalid Email." });
    }

    // Compare input password with hashed password stored in database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Password" });
    }

    // Generate JWT token for authentication
    const token = jwt.sign(
      { userId:user._id},
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

const Logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json({ message: "Logged out", token: null });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error logging out", error: error.message });
  }
};

// Function to find a user by ID
const findUser = async (req, res) => {
    const userId = req.params.userId;
    try {
      // Find user by ID in the database
      const user = await User.findById(userId) ;
      if (!user) {
        return res.status(404).json({ msg: "No User Found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server Error" });
    }
  };

  // Function to update user
const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, password } = req.body;

    const updateData = { username, password }; 

    if (password) {
      const hashedPassword = await bcrypt.hash(updateData.password, 10); 
      updateData.password = hashedPassword;
    }

    // Find and update user in the database
    const updatedUser = await User.findByIdAndUpdate({ _id: userId }, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });

  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
};


  // Function to request a password reset
const requestReset = async (req, res) => {
    try {
      const { email } = req.body;
  
      // Find user by email in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Email not found" });
      }
  
      // Generate unique code for password reset
      const code = crypto.randomBytes(20).toString("hex");
      user.resetPasswordCode = code;
      user.resetPasswordExpires = Date.now() + 300000; // 5 minutes from now
      await user.save();
  
      // Create transporter for sending email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      // Configure email options
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Password Reset",
        text: `You have requested the reset of the password for your account.\n\n
                     Your verification Code: ${code}\n\n
                     The code will expire in 5 minutes.\n\n
                     If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };
  
      // Send password reset email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  // Function to validate a password reset token/code
  const validateReset = async (req, res) => {
    try {
      const code = req.params.code;
  
      // Find user by reset password code and check expiration time
      const user = await User.findOne({
        resetPasswordCode: code,
        resetPasswordExpires: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }
  
      res.status(200).json({ message: "Code verified successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  // Function to reset user's password
  const passwordReset = async (req, res) => {
    try {
      const code = req.params.code;
      const newPassword = req.body.password;
  
      // Find user by reset password code and check expiration time
      const user = await User.findOne({
        resetPasswordCode: code,
        resetPasswordExpires: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }
  
      // Hash the new password and update user's password in the database
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetPasswordCode = null;
      user.resetPasswordExpires = null;
      await user.save();
  
      // Generate JWT token for authentication
      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      // Send response with user details and token
      res.status(200).json({ username: user.username, email: user.email, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  

module.exports = {
    Register,
    verifyEmail,
    Login,
    Logout,
    findUser, 
    updateUser,  
    requestReset,
    validateReset,
    passwordReset
}