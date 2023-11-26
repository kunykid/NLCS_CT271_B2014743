import jwt from 'jsonwebtoken';
import Movie from '../models/Movie';
import mongoose from 'mongoose';
import Admin from '../models/Admin';

export const addMovie = async(req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1]; // trả về giá trị token
    if(!extractedToken && extractedToken.trim()===""){
        return res.status(404).json({message: "Token not found"});
    }
    let adminId;

    //verify token
    jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
        if(err){
            return res.status(400).json({message: `${err.message}` });
        } else {
            adminId = decrypted.id;
            return;
        }
    });

    //create movie
    const {title, description, actors,  releaseDate, posterUrl, featured} = req.body;
    if(
    !title && title.trim()==="" && 
    !description && description.trim()==="" && 
    !posterUrl && posterUrl.trim()==="") 
    {
        return res.status(422).json({message: "Invalid Inputs"});
    }

    let movie;
    try {
        movie = new Movie({
            title, 
            description, 
            releaseDate: new Date(`${releaseDate}`), 
            posterUrl, 
            featured,
            actors,
            admin: adminId,
        });
        const session = await mongoose.startSession();
        const adminUser = await Admin.findById(adminId);
        session.startTransaction();
        
        await movie.save();//{ session }
        adminUser.addedMovies.push(movie);
        await adminUser.save();//{ session }
        await session.commitTransaction();
    } catch (error) {
        return console.log(error);
    }

    if(!movie) {
        return res.status(500).json({ message: "Request Failed"});
    }
    return res.status(201).json({ movie });
};

export const getAllMovies = async (req, res, next) => {
    let movies;

    try {
        movies = await Movie.find();
    } catch (error) {
        return console.log(error);
    }
    if(!movies) {
        return res.status(500).json({ message: "Request Failed"});
    }
    return res.status(200).json({ movies });
};

export const getMovieById = async(req, res, next) => {
    let movie;
    const id = req.params.id;
    try {
        movie = await Movie.findById(id);
    } catch (error) {
        return console.log(error);
    }
    if(!movie) {
        return res.status(404).json({ message: "Invalid Movie ID"});
    }
    return res.status(200).json({ movie });
}

export const deleteMovieById = async (req, res, next) => {
  let movie;
  const id = req.params.id;
  try {
    movie = await Movie.findByIdAndRemove(id).populate("admin");
    const session = await mongoose.startSession();
    session.startTransaction();
    await movie.admin.addedMovies.pull(movie);
    await movie.admin.save();
    session.commitTransaction();
  } catch (error) {
    return console.log(error);
  }
  if (!movie) {
    return res.status(404).json({ message: "Invalid Movie ID" });
  }
  return res.status(200).json({message: "Delete movies successfully", movie: movie._id });
};

export const updateMovie = async (req, res, next) => {
  const id = req.params.id;
  const { title, description, actors, releaseDate, posterUrl, featured } = req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !posterUrl &&
    posterUrl.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let movie;
  try {
    movie = await Movie.findByIdAndUpdate(id, {
      title,
      description,
      actors, releaseDate, posterUrl, featured
    });
  } catch (error) {
    return console.log(error);
  }
    if (!movie) {
      return res.status(500).json({ message: "Something went wrong" });
    }
    return res.status(201).json({ message: "Update Successfully", movie});
};