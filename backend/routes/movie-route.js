import express from 'express';
import { addMovie, deleteMovieById, getAllMovies, getMovieById, updateMovie } from '../controllers/movie-controller';
const movieRouter = express.Router();

movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.post("/", addMovie);
movieRouter.delete('/:id', deleteMovieById);
movieRouter.put('/:id', updateMovie);
export default movieRouter;