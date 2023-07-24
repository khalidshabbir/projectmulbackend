const User = require('../models/user')
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const sendEmail = require('../utils/sendEmail');
const moment = require('moment');
const multer = require('multer');
const upload = require('../utils/multerConfig'); // import the multer configuration

// =========================================


exports.signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already registered' });
    }

    const verificationCode = uuid.v4(); // generate a unique verification code
    const expires = Date.now() + (30 * 60 * 1000); // set expiry to 24 hours from now

    const newUser = new User({
      name,
      email,
      phone,
      password,
      verificationCode: verificationCode,
      verificationCodeExpires: expires, // add expiry timestamp to user object

    });



    await newUser.save();

    // Send the email with the OTP code
    const subject = 'Welcome to My App!';
    const html = `
    <p>Hello ${name},</p>
    <p>Please verify your email address by clicking on the following link:</p>
    <p><a href="${process.env.BASE_URL}/account-verified/${email}/${verificationCode}">Verify my email address</a></p>
    <p>If you didn't request this verification, you can safely ignore this email.</p>`;
    await sendEmail(email, subject, html);
    res.status(201).json({ message: 'User created successfully. Please verify your email.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ========================================

exports.verfiyemail = async (req, res) => {
  console.log(req.body)
  const { verify, email } = req.body;

  // Find the user with the provided verification code
  const user = await User.findOne({ email: email, verificationCode: verify });

  if (!user) {
    return res.status(400).json({ message: 'Invalid verification code' });
    console.log('Invalid verification code')
  }

  // Update the user's verified status and remove the verification code
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  if (verify !== user.verificationCode) {
    return res.status(400).json({ message: 'Invalid verification code' });
  }

  if (Date.now() > Number(user.verificationCodeExpires)) { // check if expiry timestamp has passed
    return (
      res.status(400).json({ message: 'Verification link has expired' }),
      console.log("Expire error")
    )
  }

  user.verified = true;
  user.verificationCode = null;
  user.verificationCodeExpires = null;
  await user.save();

  res.status(201).json({ message: 'Account verified successfully' });
};

// ===============================================

exports.resend = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body);

    // Find the user with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if the user's email is already verified
    if (user.verified) {
      return res.status(400).json({ message: 'Email is already verified' });
    }

    // Generate a new verification code and set the expiry timestamp
    const verificationCode = uuid.v4();
    const expiryTimestamp = moment().add(30, 'minutes'); // verification link expires in 24 hours
    user.verificationCode = verificationCode;
    user.verificationCodeExpires = expiryTimestamp;
    await user.save();

    // Send the verification email
    const subject = 'Verify your email address';
    const html = `
      <p>Hello ${user.firstName},</p>
      <p>Please verify your email address by clicking on the following link:</p>
      <p><a href="${process.env.BASE_URL}/account-verified/${email}/${verificationCode}">Verify my email address (expires on ${expiryTimestamp.format('MMMM Do YYYY, h:mm:ss a')})</a></p>
      <p>If you didn't request this verification, you can safely ignore this email.</p>
    `;
    await sendEmail(email, subject, html);

    res.status(201).json({ message: 'Verification email sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to resend verification email' });
  }
};


// =================================================

exports.signin = async (req, res) => {
  try {
    console.log(req.body); // log the request body for debugging purposes
    const user = await User.findOne({ email: req.body.email });
    const expiresIn = req.body.checked ? undefined : '6h';
    const maxAge = req.body.checked ? 0 : 6 * 60 * 60 * 1000;
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({
          _id: user._id,
          expiresIn, // include expiresIn value in the token payload
          maxAge // include maxAge value in the token payload
        }, process.env.JWT_SECRET);
        console.log(token); // log the token for debugging purposes
        res.status(200).json({
          token,
          user: user._id,
          message: "Login Successfully!"

        });
      } else {
        console.log('Invalid password'); // log an error message for debugging purposes
        return res.status(400).json({ message: 'Invalid Password' });
      }
    } else {
      console.log('User not found'); // log an error message for debugging purposes
      return res.status(400).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error); // log the error for debugging purposes
    return res.status(400).json({ error });
  }
};

// ==================================

exports.requireSignin = (req, res, next) => {

  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET)
  req.user = user;
  next()
};


// ====================================Update User Profile=====================================
exports.updateUserProfile = async (req, res) => {
  try {
    console.log("It is working")
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const emailcheck = req.body.email;
    const existingUser = await User.findOne({ emailcheck });
    if (existingUser) {
      return res.status(404).json({ message: "Email already exist" })
    } else {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.hash_password = req.body.password || user.hash_password;

      // Save updated user object to the database
      const updatedUser = await user.save();

      res.status(201).json({
        message: "Profile updated ",
        user: updatedUser
      })
    }


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getprofile = async (req, res) => {

  const userId = req.params.id;
  console.log(userId)
  try {
    const user = await User.findById(userId); // Query the user by ID
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.forgetPasswordEmailVerified = async (req, res) => {
  try {
    const email = req.body.email;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: 'User not found' });
    }

    const verificationCode = uuid.v4();
    const expiryTimestamp = moment().add(30, 'minutes'); // verification link expires in 24 hours
    existingUser.verificationCode = verificationCode;
    existingUser.verificationCodeExpires = expiryTimestamp;
    await existingUser.save();

    const subject = 'Reset Password Verification';
    const html = `<h2>Reset Password Verification</h2>
      <div class="content">
        <p>Hello,</p>
        <p>You requested to reset your password. Use the following verification code:</p>
        <p><a href="${process.env.BASE_URL}/reset-password/${email}/${verificationCode}">${verificationCode}</a></p>
        <p>This code will expire in 30 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
        <p>Thanks,</p>
      </div>`;

    await sendEmail(email, subject, html);

    return res.status(201).json({ message: 'Verification email sent successfully' });
  } catch (error) {
    // Handle the error here
    console.error('Error in forgetPasswordEmailVerified:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// ===========================================================
exports.forgetPasswordEmailVerified_resend = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body);

    // Find the user with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Generate a new verification code and set the expiry timestamp
    const verificationCode = uuid.v4();
    const expiryTimestamp = moment().add(30, 'minutes'); // verification link expires in 24 hours
    user.verificationCode = verificationCode;
    user.verificationCodeExpires = expiryTimestamp;
    await user.save();

    // Send the verification email
    const subject = 'Verify your email address';
    const html = `
      <p>Hello ${user.firstName},</p>
      <p>Please verify your email address by clicking on the following link:</p>
      <p><a href="${process.env.BASE_URL}/reset-password/${email}/${verificationCode}">Verify my email address </a></p>
      <p>If you didn't request this verification, you can safely ignore this email.</p>
    `;
    await sendEmail(email, subject, html);

    res.status(201).json({ message: 'Verification email sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to resend verification email' });
  }
};

// ======================================================================