import Theatre from "../models/theatre.model.js";  // Assuming Theatre model is in theatre.model.js
import mongoose from "mongoose";

// Create a new theatre
export const createTheatre = async (req, res) => {
    try {
        const theatreData = req.body;
        const theatre = new Theatre(theatreData);
        const savedTheatre = await theatre.save();
        res.status(201).json(savedTheatre);  // Return the saved theatre
    } catch (error) {
        console.error("Error creating theatre:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get a list of all theatres
export const listTheatres = async (req, res) => {
    try {
        const theatres = await Theatre.find({});
        res.status(200).json(theatres);  // Return all theatres in the database
    } catch (error) {
        console.error("Error fetching theatres:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get theatre details by ID
export const getTheatreDetail = async (req, res) => {
    try {
        const { theatreId } = req.params;

        // Validate if the theatreId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(theatreId)) {
            return res.status(400).json({ error: "Invalid theatre ID" });
        }

        // Fetch the theatre details by ID
        const theatre = await Theatre.findById(theatreId);

        if (!theatre) {
            return res.status(404).json({ error: "Theatre not found" });
        }

        res.status(200).json(theatre);  // Return the theatre details
    } catch (error) {
        console.error("Error fetching theatre details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
