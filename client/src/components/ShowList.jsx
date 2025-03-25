import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/show/list?type=ALL");
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error("Error fetching shows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  if (loading) return <div>Loading shows...</div>;

  return (
    <div className="show-list p-4">
      <h2 className="text-2xl font-bold mb-4">Available Shows</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {shows.map((show) => (
          <div key={show._id} className="show-card border p-4 rounded-lg shadow-lg">
            <img src={show.movie.thumbnail} alt={show.movie.title} className="w-full h-48 object-cover rounded" />
            <h3 className="text-xl font-bold mt-2">{show.movie.title}</h3>
            <p className="text-gray-600">{show.theatre.name} - {show.theatre.location}</p>
            <p className="text-gray-500">Language: {show.language}</p>
            <p className="text-gray-500">Available Seats: {show.availableSeats}</p>
            <button
              onClick={() => navigate(`/show/${show._id}`)}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowList;
