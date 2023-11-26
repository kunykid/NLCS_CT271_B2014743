import Bookings from '../models/Bookings';
import User from '../models/User';
import bcrypt from 'bcryptjs';

export const getAllUsers = async(req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        return console.log(error);
    }

    if(!users){
        return res.status(500).json({message: "Unexpected Error Occurred"});
    }
    return res.status(200).json({users});
};

export const signup = async (req, res, next) => {
    const {name, email, password} = req.body;
    if(!name && 
        name.trim()==="" &&
        !email && 
        email.trim()==="" && 
        !password && 
        password.trim()===""
    ){
        return res.status(422).json({message: "Invalid Inputs"});
    }
    const hashPassword = bcrypt.hashSync(password); 
    let user;
    try {
        user = new User({ name, email,password: hashPassword});
        user = await user.save();
    } catch (error) {
        return console.log(error);
    }
    if(!user) {
        return res.status(500).json({message: "Unexpected Error Occurred"});
    }

    return res.status(201).json({id: user._id});
};

export const updateUser = async(req, res, next) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    if (
      !name &&
      name.trim() === "" &&
      !email &&
      email.trim() === "" &&
      !password &&
      password.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid Inputs" });
    }
    const hashPassword = bcrypt.hashSync(password); 
    let user;
    try {
        user = await User.findByIdAndUpdate(id, {name, email, password: hashPassword});
    } catch (error) {
       return console.log(error);
    }
    if(!user){
        return res.status(500).json({ message: "Something went wrong" });
    }
    return res.status(200).json({ message: "Update Successfully" });
};

export const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findByIdAndRemove(id);

    } catch (error) {
        return console.log(error);
    }
    if (!user) {
      return res.status(500).json({ message: "Something went wrong" });
    }
    return res.status(200).json({ message: "Delete Successfully" });
};

export const login = async (req, res, next) => {
    const {email, password } = req.body;
    if (
      !email &&
      email.trim() === "" &&
      !password &&
      password.trim() === ""
    ){
        return res.status(422).json({ message: "Invalid Inputs" });
    }
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }
    if(!existingUser) {
        return res.status(404).json({message: "Unable to find user from this ID."});
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect) {
        return res.status(400).json({message:"Incorrect Password"})
    }
    return res
      .status(200)
      .json({ message: "Login Successfully", id: existingUser._id});
};

export const getBookingsOfUser = async(req, res, next) =>{
    const id = req.params.id;
    let bookings;
    try {
        bookings = await Bookings.find({ user: id }).populate("user movie");
    } catch (error) {
        return console.log(error);
    }
    if(!bookings) {
        return res.status(500).json({message: "Unable to get Bookings"});
    }
    return res.status(200).json({bookings});
};

export const getUserById = async (req, res, next) => {
const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
    return console.log(error);
  }

  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occurred" });
  }
  return res.status(200).json({ user });
};