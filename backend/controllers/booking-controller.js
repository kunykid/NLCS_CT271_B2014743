import mongoose from "mongoose";
import Bookings from "../models/Bookings";
import Movie from "../models/Movie";
import User from "../models/User";

export const newBooking = async(req, res, next) => {
    const {movie, date, seatNumber, user} = req.body;

    let existingMovie; //check movie
    let existingUser; //check user
    try {
        existingMovie = await Movie.findById(movie);
        existingUser = await User.findById(user);
    } catch (error) {
        return console.log(error);
    }

    if(!existingMovie) {
        return res.status(404).json({ message: "Movie Not Found With Given ID"});
    }
    if(!existingUser) {
        return res.status(404).json({ message: "User not found"});
    }

    let booking;
    try {
        booking = new Bookings({
            movie,
            date: new Date(`${date}`), 
            seatNumber, 
            user
        });
        const session = await mongoose.startSession();
        await session.startTransaction();
        existingUser.bookings.push(booking);
        existingMovie.bookings.push(booking);
        await existingUser.save();
        await existingMovie.save();
        await booking.save();
        await session.commitTransaction();
    } catch (error) {
        return console.log(error);
    }
    if(!booking) {
        return res.status(500).json({ message: "Unable to create a booking"});
    }
    return res.status(201).json({ booking});
}

export const getBookingByAll = async (req, res, next) => {
  let booking;
  try {
    booking = await Bookings.find();
  } catch (error) {
    return console.log(error);
  }

  if (!booking) {
    return res.status(500).json({ message: "Unexpected Error" });
  }
  return res.status(200).json({ booking });
};

export const getBookingById = async(req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
        booking = await Bookings.findById(id);
    } catch (error) {
        return console.log(error);
    }

    if(!booking) {
        return res.status(500).json({message: "Unexpected Error"});
    }
    return res.status(200).json({booking});
}

export const deleteBooking = async(req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
        booking = await Bookings.findByIdAndRemove(id).populate("user movie");
        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.movie.save();
        await booking.user.save();
        session.commitTransaction();
    } catch (error) {
        return console.log(error);
    }
    if(!booking){
        return res.status(500).json({message: "Unable to Delete"});
    }
    return res.status(200).json({message: "Successfully Deleted"})
}