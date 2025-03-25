import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from "date-fns";

function TheatreList() {
    const [theatres, setTheatres] = useState([]);
    const { movieId } = useParams();

    const loadTheatres = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/show/list?movie=${movieId}&date=2019-08-14`);
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

    useEffect(() => {
        loadTheatres();
    }, [movieId]); // Re-run when movieId changes

    return (
        <>
            {Array.isArray(theatres) && theatres.length > 0 ? (
                theatres.map((theatre) => (
                    <div key={theatre._id} className="flex border border-blue-500 p-4 rounded shadow m-2">
                        <div className="w-1/3">
                            <div className="text-lg font-bold">Theatre Name</div>
                            <div className="text-sm font-regular">Theatre Id: {theatre._id}</div>
                        </div>
                        <div className="w-2/3 flex gap-2">
                            {Array.isArray(theatre.shows) &&
                                theatre.shows.map((show) => (
                                    <Link key={show._id} to={`/show/${show._id}`}>
                                        <button className="bg-transparent border border-blue-500 text-blue-500 py-2 px-4 hover:bg-blue-500 hover:text-white">
                                            {format(new Date(show.datetime), 'hh:mm a')}
                                        </button>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-600">No theatres available</p>
            )}
        </>
    );
}

export default TheatreList;
