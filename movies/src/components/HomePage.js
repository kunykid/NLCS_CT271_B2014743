import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MovieItem from './Movies/MovieItem';
import { Link } from 'react-router-dom';
import { getAllMovies } from '../api-helpers/api-helpers';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
    .then((data) => setMovies(data.movies))
    .catch((err) => console.log(err));
  }, []);
  return (
    <Box width="100%" height="100%" marginTop={2} margin="auto">
      <Box margin={"auto"} width="80%" height={"40vh"} padding={2}>
        <img
          src="https://images7.alphacoders.com/132/1329456.jpeg"
          alt="background"
          width={"100%"}
          height={"100%"}
        />
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"}> 
          Latest Releases 
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" flexWrap="wrap">
        {movies &&
          movies.map((movie, index) => (
            <MovieItem
              id={movie.id}
              title={movie.title}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              key={index}
            />
          ))}
      </Box>
      <Box display="flex" padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="outlined"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View All Movie
        </Button>
      </Box>
    </Box>
  );
}

export default HomePage