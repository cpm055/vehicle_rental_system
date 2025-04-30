import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/users.model.js";

import Admins from "../models/admin.model.js";
import Staff from "../models/staff.model.js";
import DelManger from "../models/delManager.model.js";
import DelPerson from "../models/delPerson.model.js";


//Customer
export const registerUser = async (req, res) => {
  const { email, full_name, address, phone, password } = req.body;

  if (!email || !full_name || !address || !phone || !password) {
    return res.status(400).json({ success: false, message: "Please Provide All Fields" });
  }



  try {
    let userExists = await User.findOne({ email });
    if (userExists) return res.status(200).json({ success: false, message: "User already exists!" });

    if (password.length < 8) {
      return res.status(200).json({ success: false, message: "Please enter at least 8 characters as password!" });
    }

    
    if (phone.length !== 10) {
      return res.status(400).json({ success: false, message: "Phone number should have 10 digits!" });
  }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, full_name, address, phone, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ success: true, message: "User registered successfully" });

  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, name: user.full_name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ success: true, token });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "User Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete Failed!" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params; 
  try {
    const users = await User.findById(id);
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params; // Get the user ID from URL params
  const { email, full_name, address, phone, password } = req.body; // Extract updated data

  if (!email || !full_name || !address || !phone || !password) {
    return res.status(400).json({ success: false, message: "Please Provide All Fields" });
  }
  if (password.length < 8) {
    return res.status(400).json({ success: false, message: "Password should have 8 numbers !" });
  }

  if (phone.length !== 10) {
    return res.status(400).json({ success: false, message: "Phone number should have 10 digits!" });
}

  try {


    const updateData = { email, full_name, address, phone };

    // If password is provided, hash it before updating
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }


    const user = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }


    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//Admin
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admins.findOne({ email });
    if (!admin) return res.status(400).json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ id: admin._id, name: admin.full_name, email: admin.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ success: true, token });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const registerAdmin = async (req, res) => {
  const { email, full_name, address, phone, password } = req.body;

  if (!email || !full_name || !address || !phone || !password) {
    return res.status(400).json({ success: false, message: "Please Provide All Fields" });
  }

  try {
    let userExists = await Admins.findOne({ email });
    if (userExists) return res.status(200).json({ success: false, message: "User already exists!" });

    if (password.length < 8) {
      return res.status(200).json({ success: false, message: "Please enter at least 8 characters as password!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admins({ email, full_name, address, phone, password: hashedPassword });

    await newAdmin.save();
    res.status(201).json({ success: true, message: "User registered successfully" });

  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}



//Staff
export const staffLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const staff = await Staff.findOne({ email });
    if (!staff) return res.status(400).json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ id: staff._id, name: staff.full_name, email: staff.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ success: true, token });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const registerStaff = async (req, res) => {
  const { email, full_name, address, phone, password } = req.body;

  if (!email || !full_name || !address || !phone || !password) {
    return res.status(400).json({ success: false, message: "Please Provide All Fields" });
  }

  try {
    let userExists = await Staff.findOne({ email });
    if (userExists) return res.status(200).json({ success: false, message: "User already exists!" });

    if (password.length < 8) {
      return res.status(200).json({ success: false, message: "Please enter at least 8 characters as password!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Staff({ email, full_name, address, phone, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ success: true, message: "User registered successfully" });

  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json({ success: true, staff });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAStaff = async (req, res) => {
  const { id } = req.params; 
  try {
    const staff = await Staff.findById(id);
    res.status(200).json({ success: true, staff });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateStaff = async (req, res) => {
  const { id } = req.params; // Get the user ID from URL params
  const {  email, full_name, address, phone, password } = req.body; // Extract the updated data from request body
  
  try {
    // Find the user by ID and update their details
    const staff = await Staff.findByIdAndUpdate(id, {
      email,
      full_name,
      address,
      phone,
      password
    }, { new: true }); // `new: true` ensures the returned staff is the updated version

    if (!staff) {
      return res.status(404).json({ success: false, message: "staff not found" });
    }

    // Respond with the updated staff data
    res.status(200).json({ success: true, staff });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteStaff = async (req, res) => {
  const { id } = req.params;
  try {
    await Staff.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "User Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete Failed!" });
  }
};

//DeliveryManger
export const delManagerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const delManager = await DelManger.findOne({ email });
    if (!delManager) return res.status(400).json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, delManager.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ id: delManager._id, name: delManager.full_name, email: delManager.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ success: true, token });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const registerDelManager = async (req, res) => {
  const { email, full_name, address, phone, password } = req.body;

  if (!email || !full_name || !address || !phone || !password) {
    return res.status(400).json({ success: false, message: "Please Provide All Fields" });
  }

  try {
    let userExists = await DelManger.findOne({ email });
    if (userExists) return res.status(200).json({ success: false, message: "User already exists!" });

    if (password.length < 8) {
      return res.status(200).json({ success: false, message: "Please enter at least 8 characters as password!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new DelManger({ email, full_name, address, phone, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ success: true, message: "User registered successfully" });

  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//DelPerson
export const delPersonLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const delPerson = await DelPerson.findOne({ email });
    if (!delPerson) return res.status(400).json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, delPerson.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ id: delPerson._id, name: delPerson.full_name, email: delPerson.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ success: true, token });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const registerDelPerson = async (req, res) => {
  const { email, full_name, address, phone, password } = req.body;

  if (!email || !full_name || !address || !phone || !password) {
    return res.status(400).json({ success: false, message: "Please Provide All Fields" });
  }

  try {
    let userExists = await DelPerson.findOne({ email });
    if (userExists) return res.status(200).json({ success: false, message: "User already exists!" });

    if (password.length < 8) {
      return res.status(200).json({ success: false, message: "Please enter at least 8 characters as password!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new DelPerson({ email, full_name, address, phone, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ success: true, message: "User registered successfully" });

  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getDelPersons = async (req, res) => {
  try {
    const delPerson = await DelPerson.find();
    res.status(200).json({ success: true, delPerson });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteDelPerson = async (req, res) => {
  const { id } = req.params;
  try {
    await DelPerson.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "User Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete Failed!" });
  }
};

