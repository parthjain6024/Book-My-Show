import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams(); // Extract the movieId from URL params

  const loadMovie = async () => {
    try {
        console.log(movieId)
      const response = await fetch(`http://localhost:3001/api/movie/${movieId}`);
      const movieData = await response.json();
      setMovie(movieData);
    } catch (error) {
      console.error("Error loading movie details:", error);
    }
  };

  useEffect(() => {
    loadMovie();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-detail-container p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-center mb-4">
          <img
            className="w-96 h-60 object-cover rounded-lg"
            src={movie.thumbnail}
            alt={movie.title}
          />
        </div>
        <div className="movie-info">
          <h1 className="text-3xl font-semibold text-gray-800">{movie.title}</h1>
          <p className="mt-2 text-lg text-gray-600">{movie.description}</p>
          <p className="mt-4 text-md font-medium text-gray-800">Rating: {movie.rating}</p>
          <p className="mt-2 text-sm text-gray-700">Genres: {movie.genre}</p>
          <p className="mt-4 text-sm text-gray-500">Released on: {new Date(movie.releaseDate).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
