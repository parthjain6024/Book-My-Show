import mongoose from 'mongoose';
import Show from '../models/show.model.js';

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

        // Validate if the showId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(showId)) {
            return res.status(400).json({ error: "Invalid show ID" });
        }

        // Fetch the show by ID and populate movie and theatre details
        const show = await Show.findById(showId)
            .populate('movie')   // Populate movie details
            .populate('theatre') // Populate theatre details
            .exec();             // Execute the query

        // If show not found, return 404 error
        if (!show) {
            return res.status(404).json({ error: "Show not found" });
        }

        // Return the show with populated movie and theatre details
        res.status(200).json(show);
    } catch (error) {
        console.error("Error fetching show details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Fetch the list of shows
export const listShows = async (req, res) => {
    try {
        // Fetch all shows from the database, populated with movie and theatre details
        const shows = await Show.find({})
            .populate('movie')   // Populate movie details
            .populate('theatre') // Populate theatre details
            .exec();

        res.status(200).json(shows);  // Send the shows data in the response
    } catch (error) {
        console.error("Error fetching shows:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// New function for handling the booking
export const bookTicket = async (req, res) => {
    const { showId } = req.params;
    const { selectedSeats } = req.body;

    try {
        const show = await Show.findById(showId);
        if (!show) {
            return res.status(404).json({ error: "Show not found" });
        }

        // Check seat availability
        const allAvailableSeats = show.seats
            .flatMap(seatCategory => seatCategory.arrangements.flat())
            .filter(seat => seat.status !== "BOOKED");

        const unavailableSeats = selectedSeats.filter(
            seat => !allAvailableSeats.some(availableSeat => availableSeat.seatNumber === seat)
        );

        if (unavailableSeats.length > 0) {
            return res.status(400).json({ error: `Seats ${unavailableSeats.join(", ")} are not available.` });
        }

        // Mark the seats as booked
        show.seats.forEach(seatCategory => {
            seatCategory.arrangements.forEach(row => {
                row.forEach(seat => {
                    if (selectedSeats.includes(seat.seatNumber)) {
                        seat.status = "BOOKED";
                    }
                });
            });
        });

        await show.save();
        res.status(200).json({ message: "Booking confirmed!", selectedSeats });
    } catch (error) {
        console.error("Error booking tickets:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
