import express from "express";
import { addDelivery, assignDelivery, deleteAssignDelivery, deleteDelivery, getAssignDeliveries, getDeliveries, getDelivery, updateAssignDeliveries, updateDelivery } from "../controllers/delivery.controller.js";


const router = express.Router();

router.post("/addDelivery" , addDelivery);
router.get("/getDeliveries", getDeliveries);
router.get("/delivery/:id", getDelivery);
router.put("/delivery/:id", updateDelivery);
router.delete("/delivery/:id", deleteDelivery);

router.post("/assignDel", assignDelivery);
router.get("/assignDels", getAssignDeliveries);
router.put("/assignDels/:id", updateAssignDeliveries);
router.delete("/assignDels/:id", deleteAssignDelivery);

export default router;