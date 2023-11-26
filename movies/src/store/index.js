import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { isLoggedIn: false },
  reducers: {
    userLogin(state) {
      state.isLoggedIn = true;
    },
    userLogout(state) {
      localStorage.removeItem("userId");
      state.isLoggedIn = false;
    },
  },
});

const adminSlice = createSlice({
  name: "admin",
  initialState: { isLoggedIn: false },
  reducers: {
    adminLogin(state) {
      state.isLoggedIn = true;
    },
    adminLogout(state) {
      localStorage.removeItem("adminId");
      localStorage.removeItem("token");
      state.isLoggedIn = false;
    },
  },
});

export const userActions = userSlice.actions;
export const adminActions = adminSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    admin: adminSlice.reducer,
  },
});
