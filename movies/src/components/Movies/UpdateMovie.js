import { Box, Typography, Button, Checkbox, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getMovieById, updateMovie } from "../../api-helpers/api-helpers";
import { useParams } from "react-router-dom";

const UpdateMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
  });
  const [actor, setActor] = useState("");
  const [actors, setActors] = useState([]);

  useEffect(() => {
    getMovieById(id)
      .then((data) => {
        setMovie(data.movie);
        setInputs({
          title: data.movie.title,
          description: data.movie.description,
          posterUrl: data.movie.posterUrl,
          releaseDate: data.movie.releaseDate,
          featured: data.movie.featured,
        });
        setActors(data.movie.actors);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddActor = () => {
    setActors([...actors, actor]);
    setActor("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedMovie = {
      ...movie,
      title: inputs.title,
      description: inputs.description,
      posterUrl: inputs.posterUrl,
      releaseDate: inputs.releaseDate,
      actors: actors,
      featured: inputs.featured,
    };

    updateMovie(id, updatedMovie)
      .then((data) => {
        alert(data.message);
        window.location.href='/';
        console.log("Movie updated:", data);
        // Thực hiện các tác vụ sau khi cập nhật phim thành công
      })
      .catch((err) => {alert(err);console.log(err)});
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          padding={10}
          margin={"auto"}
          display={"flex"}
          flexDirection={"column"}
          boxShadow={"10px 10px 20px #ccc"}
        >
          <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"}>
            Update Movie
          </Typography>
          <TextField
            label="Title"
            value={inputs.title}
            onChange={handleChange}
            name="title"
            variant="standard"
            margin="normal"
          />
          <TextField
            label="Description"
            value={inputs.description}
            onChange={handleChange}
            name="description"
            variant="standard"
            margin="normal"
          />
          <TextField
            label="Poster URL"
            value={inputs.posterUrl}
            onChange={handleChange}
            name="posterUrl"
            variant="standard"
            margin="normal"
          />
          <TextField
            label="Release Date"
            type="date"
            value={inputs.releaseDate}
            onChange={handleChange}
            name="releaseDate"
            variant="standard"
            margin="normal"
          />
          <Box display={"flex"} alignItems="center">
            <TextField
              label="Actor"
              value={actor}
              name="actor"
              variant="standard"
              margin="normal"
              onChange={(e) => setActor(e.target.value)}
            />
            <Button onClick={handleAddActor}>Add</Button>
          </Box>
          <Box display="flex" flexDirection="column">
            {actors.map((actor, index) => (
              <Typography key={index}>{actor}</Typography>
            ))}
          </Box>
          <Checkbox
            name="featured"
            checked={inputs.featured}
            onChange={(e) =>
              setInputs((prevState) => ({
                ...prevState,
                featured: e.target.checked,
              }))
            }
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "30%",
              margin: "auto",
              bgcolor: "#2b2d42",
              ":hover": { bgcolor: "#121217" },
            }}
          >
            Update Movie
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default UpdateMovie;
