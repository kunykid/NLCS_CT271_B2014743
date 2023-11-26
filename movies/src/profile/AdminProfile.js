import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  List,
  IconButton,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import {
  getAdminById, deleteMovie,
} from "../api-helpers/api-helpers";
import { Link } from "react-router-dom";

const AdminProfile = () => {
  const [admin, setAdmin] = useState();
  useEffect(() => {
    getAdminById()
      .then((res) => setAdmin(res.admin))
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
      deleteMovie(id)
        .then((res) => {
          alert("Đã xóa phim thành công");
          window.location.reload();
        })
        .catch((err) => console.log(err));
  };
  const handleUpdate = (id) => {
    console.log(id);
  }
  return (
    <Box width="100%" display="flex">
      <Fragment>
        {" "}
        {admin && (
          <Box
            flexDirection="column"
            justifyContent="center"
            alignContent="center"
            width="30%"
          >
            <AccountCircleIcon
              sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }}
            />
            <Typography
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Email: {admin.email}
            </Typography>
          </Box>
        )}
        {admin && admin.addedMovies.length > 0 && (
          <Box width="70%" display="flex" flexDirection="column">
            <Typography
              variant="h3"
              fontFamily={"verdana"}
              textAlign="center"
              padding={2}
            >
              Added Movies
            </Typography>
            <Box
              margin="auto"
              display="flex"
              flexDirection="column"
              width="80%"
            >
              <List>
                {admin.addedMovies.map((movie, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      bgcolor: "#00d386",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                    }}
                  >
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Movie: {movie.title}
                    </ListItemText>
                    <IconButton
                      onClick={() => handleUpdate(movie._id)}
                      LinkComponent={Link}
                      to={`/update-movie/${movie._id}`}
                      color="error"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(movie._id)}
                      color="error"
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </Fragment>
    </Box>
  );
};

export default AdminProfile;
