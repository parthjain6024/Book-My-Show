import React, { useState, useEffect } from 'react';

function TheatreList() {
    const [theatres, setTheatres] = useState([]);

    // Function to fetch all theatres
    const loadTheatres = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/theatre/list');
            const theatreList = await response.json();
            console.log("Fetched Theatres:", theatreList); // Debugging

            if (Array.isArray(theatreList)) {
                setTheatres(theatreList);
            } else {
                setTheatres([]); // Ensure it's an array
            }
        } catch (error) {
            console.error("Error loading theatres:", error);
            setTheatres([]); // Handle error by resetting to an empty array
        }
    };

    // Load theatres when the component mounts
    useEffect(() => {
        loadTheatres();
    }, []); // Empty dependency array to load only once when the component mounts

    return (
        <div className="theatre-list">
            {Array.isArray(theatres) && theatres.length > 0 ? (
                theatres.map((theatre) => (
                    <div key={theatre._id} className="flex border border-blue-500 p-4 rounded shadow m-2">
                        <div className="w-full">
                            <div className="text-lg font-bold">{theatre.name}</div>
                            <div className="text-sm font-regular">Location: {theatre.location}</div>
                            <div className="text-sm font-regular">Phone Number: {theatre.phoneNumber}</div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-600">No theatres available</p>
            )}
        </div>
    );
}

export default TheatreList;
