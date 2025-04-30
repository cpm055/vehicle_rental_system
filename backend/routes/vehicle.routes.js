import express from "express";

import { addVehicle, deleteVehicle, getVehicle, getVehicles, updateVehicle } from "../controllers/vehicle.controller.js";

const router = express.Router();

router.post("/addVehicle" , addVehicle);
router.get("/getVehicles", getVehicles);
router.get("/vehicle/:id", getVehicle);
router.put("/vehicle/:id", updateVehicle);
router.delete("/vehicle/:id", deleteVehicle);

export default router;