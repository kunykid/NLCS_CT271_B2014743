import Header from "./components/Header";
import {Routes, Route} from 'react-router-dom';
import HomePage from "./components/HomePage";
import Movies from "./components/Movies/Movies";
import Auth from "./components/Auth/Auth";
import Admin from "./components/Auth/Admin";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adminActions, userActions } from "./store";
import Booking from "./components/Bookings/Booking";
import UserProfile from "./profile/USerProfile";
import AddMovie from "./components/Movies/AddMovie";
import AdminProfile from "./profile/AdminProfile";
import UpdateMovie from "./components/Movies/UpdateMovie";


function App() {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isUserLoggedIn", isUserLoggedIn);
  useEffect(() => {
    if(localStorage.getItem("userId")) {
      dispatch(userActions.userLogin());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.adminLogin());
    }
  }, [dispatch]);
  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          {!isUserLoggedIn && !isAdminLoggedIn && (
            <>
              {" "}
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />} />
            </>
          )}
          {isUserLoggedIn && !isAdminLoggedIn && (
            <>
              {" "}
              <Route path="/user" element={<UserProfile />} />
              <Route path="/booking/:id" element={<Booking />} />
            </>
          )}
          {isAdminLoggedIn && !isUserLoggedIn && (
            <>
              {" "}
              <Route path="/user-admin" element={<AdminProfile />} />
              <Route path="/add" element={<AddMovie />} />
              <Route path="/update-movie/:id" element={<UpdateMovie />} />
            </>
          )}
        </Routes>
      </section>
    </div>
  );
}

export default App;
