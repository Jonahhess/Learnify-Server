const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = jwt.sign(newUser.toObject(), process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        //secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: "strict",
        maxAge: 3600000, // 1 hour
      })
      .status(201)
      .json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        //secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: "strict",
        maxAge: 3600000, // 1 hour
      })
      .json({ message: "Logged in successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
