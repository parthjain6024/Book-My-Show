import Movie from "../models/movie.model.js";
import Theatre from "../models/theatre.model.js";
import User from "../models/user.model.js";

export const createMovie = async(req,res) =>{

    const movieData = req.body;
    try {
        
        let theatre = await Theatre.findOne({name:movieData.theatre?.name});
        if(!theatre){
            theatre=await Theatre.create(movieData.theatre);
        }  //get the id of the

        const data = await Movie.create({...movieData, theatre: theatre._id});
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getMovies = async(req,res) =>{
    const type = req.query.type; // ALL, UPCOMING, LIVE
    const title = req.query.title;
    let queryFilter ={};

    if(title){
        queryFilter.title = new RegExp(title,'g')
    };

    switch(type){
        case 'ALL':{
            break;
        }
        case 'UPCOMING':{
            queryFilter={releaseDate:{$gte  :new Date()}}
            break;
        }
        case 'LIVE':{
            queryFilter={releaseDate:{$lt : new Date()}}
            break;
        }
        default:
            break;
    }


    try {
        const data = await Movie.find(queryFilter).populate('theatre');
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
}


export const getMovieById = async (req, res) => {
    const { movieId } = req.params; // Get the movieId from URL params

    try {
        // Find the movie by its ObjectId
        const movie = await Movie.findById(movieId).populate('theatre'); // Populating the 'theatre' relation if needed

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' }); // If no movie is found, return a 404
        }

        res.status(200).json(movie); // Return the found movie
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving movie', error }); // Handle errors
    }
};
