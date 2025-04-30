import express from "express";
import { registerUser, loginUser, deleteUser, adminLogin, registerAdmin, staffLogin, getUsers, updateUser, getUser, registerStaff, getStaff, getAStaff, updateStaff, deleteStaff, delManagerLogin, registerDelManager, registerDelPerson, getDelPersons, deleteDelPerson, delPersonLogin } from "../controllers/auth.controller.js";



const router = express.Router();

router.post("/sign-up", registerUser);
// Registers a new user (probably creates a user in the database)

router.post("/login", loginUser);
// Authenticates a user and returns a token/session

router.delete("/users/:id", deleteUser);
// Deletes a user by their ID

router.get('/users', getUsers);
// Retrieves a list of all users

router.get('/user/:id', getUser);
// Retrieves a single user by ID

router.put('/user/:id', updateUser);
// Updates user information by ID


router.post("/adminLogin", adminLogin);
router.post("/adminSignup", registerAdmin);

router.post("/staffLogin", staffLogin);
router.post("/staffSignUp", registerStaff);
router.get("/staff", getStaff);
router.get("/staff/:id", getAStaff);
router.put("/staff/:id", updateStaff);
router.delete("/staff/:id", deleteStaff);

router.post('/delManLogin', delManagerLogin);
router.post("/delManSignUp", registerDelManager);

router.post('/delPerSignUp', registerDelPerson);
router.post('/delPerLogin', delPersonLogin);
router.get('/delPersons', getDelPersons);
router.delete("/delPerson/:id" , deleteDelPerson);

export default router;