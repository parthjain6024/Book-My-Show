import mongoose from "mongoose";
import Show from "../models/show.model.js";

export const createShow = async (req, res) => {
    try {
        const showDetails = req.body;
        const response = await Show.create(showDetails);
        res.status(201).json(response);
    } catch (error) {
        console.error("Error creating show:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const showDetail = async (req, res) => {
    try {
        const { showId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(showId)) {
            return res.status(400).json({ error: "Invalid show ID" });
        }
        
        const response = await Show.findById(showId);
        if (!response) {
            return res.status(404).json({ error: "Show not found" });
        }
        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching show details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const listShows = async (req, res) => {
    try {
        const { movie, date } = req.query;
        
        if (!mongoose.Types.ObjectId.isValid(movie)) {
            return res.status(400).json({ error: "Invalid movie ID" });
        }
        
        const movieDate = date || new Date().toISOString().split("T")[0];
        
        const response = await Show.aggregate([
            {
                $match: {
                    movie: new mongoose.Types.ObjectId(movie),
                    datetime: {
                        $gte: new Date(`${movieDate}T00:00:00.000Z`),
                        $lt: new Date(`${movieDate}T23:59:59.999Z`)
                    }
                }
            },
            {
                $group: {
                    _id: "$theatre",
                    shows: { $push: "$$ROOT" }
                }
            }
        ]).exec();

        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching shows:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};