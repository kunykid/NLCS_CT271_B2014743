import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRouter from "./routes/user-route";
import adminRouter from './routes/admin-route';
import movieRouter from './routes/movie-route';
import bookingRouter from './routes/booking-route';
dotenv.config();
const app = express();
app.use(cors());
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", (req, res, next) => {
    res.render("addMovie");
});

// middlewares
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingRouter);

mongoose.connect(`mongodb://127.0.0.1:27017/movie-booking-system`)
.then(() => 
    app.listen(5000, () => 
        console.log(`Connected to Database and server is running`)
    )
)
.catch((e) => console.log(e));
