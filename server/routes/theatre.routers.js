import { Router } from "express";
import { createTheatre, listTheatres, getTheatreDetail } from "../controllers/theatre.controller.js";
import isLoggedIn from "../middlewares/authentication.js";  // Assuming authentication middleware
import authorizedRoles from "../middlewares/authorization.js";  // Assuming authorization middleware

const router = Router();

// Route to create a new theatre (restricted to Admin)
router.post("/", isLoggedIn, authorizedRoles("Admin"), createTheatre);

// Route to list all theatres (accessible by all users)
router.get("/list", listTheatres);

// Route to get the details of a specific theatre by ID (accessible by all users)
router.get("/:theatreId", getTheatreDetail);

export default router;
