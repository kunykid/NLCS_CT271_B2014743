import React from "react";
import AuthForm from "../Auth/AuthForm";
import { senAdminAuthRequest } from "../../api-helpers/api-helpers";
import { useDispatch } from "react-redux";
import { adminActions } from "../../store";
import { useNavigate } from "react-router-dom";
const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (data) => {
    console.log(data);
    dispatch(adminActions.adminLogin());
    localStorage.setItem("adminId", data.id);
    localStorage.setItem("token", data.token);
    navigate("/");
  };
  const getData = (data) => {
    console.log("Admin", data);
    senAdminAuthRequest(data.inputs)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  );
};

export default Admin;
