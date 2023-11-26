import React, { Fragment, useEffect, useState } from 'react'
import { getMovieDetails, newBooking } from '../../api-helpers/api-helpers'
import { useParams } from 'react-router-dom'
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';
const Booking = () => {
    const [movie, setMovie] = useState();
    const [error, setError] = useState(false);
    const id = useParams().id;
    const [inputs, setInputs] = useState({
        seatNumber: "",
        date: "",
    });
    useEffect(() => {
        getMovieDetails(id)
        .then((res) => setMovie(res.movie))
        .catch((err) => console.log(err));
    }, [id]);
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState, 
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!inputs.seatNumber || !inputs.date) {
          setError(true);
          return;
        }

        newBooking({...inputs, movie: movie._id})
        .then((res) => {
          alert('Đặt vé thành công'); 
          window.location.reload(); 
          console.log(res)})
        .catch((err) => console.log(err));
    }
  return (
    <div>
      {movie && (
        <Fragment>
          <Typography
            padding={3}
            fontFamily="fantasy"
            variant="h4"
            textAlign="center"
          >
            Book Tickets Of Movie: {movie.title}
          </Typography>
          <Box display="flex" justifyContent="center">
            <Box
              display="flex"
              justifyContent="column"
              flexDirection={"column"}
              paddingTop={3}
              width={"50%"}
              marginRight={"auto"}
            >
              <img
                width={"80%"}
                height={"300px"}
                src={movie.posterUrl}
                alt={movie.title}
              />
              <Box width={"80%"} marginTop={3} padding={2}>
                <Typography paddingTop={2}>{movie.description}</Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Diễn viên:
                  {movie.actors.map((actor) => " " + actor + ",")}
                </Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Ngày chiếu: {new Date(movie.releaseDate).toDateString()}
                </Typography>
              </Box>
            </Box>
            <Box width={"50%"} paddingTop={3}>
              <form onSubmit={handleSubmit}>
                <Box
                  padding={5}
                  margin={"auto"}
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <FormLabel>Seat Number</FormLabel>
                  <TextField
                    value={inputs.seatNumber}
                    onChange={handleChange}
                    name="seatNumber"
                    type="number"
                    margin="normal"
                    variant="standard"
                  ></TextField>
                  <FormLabel>Booking Date</FormLabel>
                  <TextField
                    value={inputs.date}
                    onChange={handleChange}
                    name="date"
                    type="date"
                    margin="normal"
                    variant="standard"
                  ></TextField>
                  {error && (
                    <Typography color="red" margin={2}>
                      Vui lòng nhập đầy đủ thông tin.
                    </Typography>
                  )}
                  <Button type="submit" sx={{ mt: 3 }}>
                    Book Now
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  );
}

export default Booking