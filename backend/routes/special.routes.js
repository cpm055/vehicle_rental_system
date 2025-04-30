import express from "express";
import { getLocationCoordinates, getRoute, getWeather } from "../controllers/special.controller.js";

const router = express.Router();

// Define the route to get coordinates for a given location
router.get('/get-coordinates/:location', getLocationCoordinates);

// Define the route to get route details between two locations using GET
router.get('/get-route/:start/:destination', getRoute);
router.get('/weather/:city', getWeather);

export default router;
