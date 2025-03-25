import mongoose from "mongoose";
import Movie from "./models/movie.model.js";
import Theatre from "./models/theatre.model.js";
import connectToDatabase from "./config/dbConfig.js";

const seedDatabase = async () => {
  try {
    await connectToDatabase();
    
    // 1️⃣ Clear existing data
    await Movie.deleteMany();
    await Theatre.deleteMany();

    // 2️⃣ Create a theatre
    const theatre = await Theatre.create({
      name: "PVR Cinemas",
      location: "Mumbai",
      phoneNumber: "1234567890"
    });

    console.log(`✅ Theatre Created: ${theatre._id}`);

    // 3️⃣ Insert movie with theatre reference
    const movie = await Movie.create({
      title: "SpiderMan",
      description: "A high-octane action thriller...",
      thumbnail: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/jawan-et00330424-1693892482.jpg",
      bannerImage: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/jawan-et00330424-1693892482.jpg",
      trailerVideo: "https://www.youtube.com/embed/8ZRaZzoJvUU",
      rating: 8.4,
      genre: "Thriller",
      releaseDate: "2023-09-07",
      language: ["English", "Hindi", "Telugu"],
      theatre: theatre._id // ✅ Pass the valid theatre ID here
    });

    console.log(`🎬 Movie Created: ${movie.title}`);

    process.exit(0); // Exit after successful seeding
  } catch (error) {
    console.error(`❌ Seeding Failed: ${error}`);
    process.exit(1);
  }
};

// Run seeding function
seedDatabase();
