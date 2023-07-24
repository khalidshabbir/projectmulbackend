const User = require('../../models/user')
const jwt = require('jsonwebtoken');

// =========================================

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Admin already registered' });
    }

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
      role:'admin'
    });

    // Save new user to database
    await newUser.save();

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



// =================================================

exports.signin = async (req, res) => {
  try {
    console.log(req.body); // log the request body for debugging purposes
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (user.authenticate(req.body.password)&& user.role==='admin') {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1m' });
        console.log(token); // log the token for debugging purposes
        const { firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: {
            firstName, lastName, email, role, fullName
          }
        });
      } else {
        console.log('Invalid password'); // log an error message for debugging purposes
        return res.status(400).json({
          message: 'Invalid Password'
        });
      }
    } else {
      console.log('User not found'); // log an error message for debugging purposes
      return res.status(400).json({
        message: 'User not found'
      });
    }
  } catch (error) {
    console.error(error); // log the error for debugging purposes
    return res.status(400).json({ error });
  }
};

// ==================================

exports.requireSignin = (req, res, next) => {
  
  const token  =req.headers.authorization.split(" ")[1];
  const user=jwt.verify(token, process.env.JWT_SECRET)
  req.user=user;
  next()
};
