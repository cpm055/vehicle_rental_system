import express from "express";
import { registerUser, loginUser, deleteUser, adminLogin, registerAdmin, staffLogin, getUsers, updateUser, getUser, registerStaff, getStaff, getAStaff, updateStaff, deleteStaff, delManagerLogin, registerDelManager, registerDelPerson, getDelPersons, deleteDelPerson, delPersonLogin } from "../controllers/auth.controller.js";



const router = express.Router();

router.post("/sign-up", registerUser);
router.post("/login", loginUser);
router.delete("/users/:id", deleteUser);
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.put('/user/:id', updateUser)

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