// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const MovieList = () => {
//   const [movies, setMovies] = useState([]);

//   const loadMovies = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:3001/api/movie/list?type=ALL"
//       );
//       const movieList = await response.json();
//       setMovies(movieList);
//     } catch (error) {
//       console.error("Error loading movies:", error);
//     }
//   };

//   useEffect(() => {
//     loadMovies();
//   }, []);

//   return (
//     <ul role="list" className="flex-auto divide-y divide-gray-100">

// {movies.map((movie) => (
//   <li key={movie.id} className="flex justify-between gap-x-6 py-5">
//     <div className="flex min-w-0 gap-x-4">
//       <img
//         className="h-12 w-12 flex-none rounded-full bg-gray-50"
//         src={movie.thumbnail}
//         alt=""
//       />
//       <div className="min-w-0 flex-auto">
//         <p className="text-sm font-semibold leading-6 text-gray-900">
//           <Link to={`/movies/${movie._id}`}>
//           {movie.title}
//           </Link>
//         </p>
//         <p className="mt-1 truncate text-xs leading-5 text-gray-500">
//           {movie.description}
//         </p>
//       </div>
//     </div>
//     <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
//       <p className="text-sm leading-6 text-gray-900">Rating:{movie.rating}</p>
//       <p className="mt-1 text-xs leading-5 text-gray-500">
//         Genres:{movie.genre}
//       </p>
//     </div>
//   </li>
// ))}

//     </ul>
//   );
// };

// export default MovieList;






import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  const loadMovies = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/movie/list?type=ALL"
      );
      const movieList = await response.json();
      setMovies(movieList);
    } catch (error) {
      console.error("Error loading movies:", error);
    }
  };


  useEffect(() => {
    loadMovies();
  },[]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="relative bg-gradient-to-b from-pink-200 via-yellow-200 to-cyan-200 p-4 rounded-md shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
        >
          <img
            className="h-48 w-full object-cover rounded-md mb-4"
            src={movie.thumbnail}
            alt=""
          />
          <div className="flex flex-col justify-between">
            <div className="min-w-0">
              <p className="text-lg font-semibold text-gray-800">
                <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
              </p>
              <p className="mt-2 text-sm text-gray-700">{movie.description}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-800">
                Rating: {movie.rating}
              </p>
              <p className="mt-1 text-xs text-gray-700">Genres: {movie.genre}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;


