import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN, selectUser } from "../redux/userSlice";

const LoginPage = () => {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSumbitLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/users/login", { name, password })
      .then((res) => {
        dispatch(
          LOGIN({
            ...res.data.user,
          })
        );
        navigate("/main");
      })
      .catch((err) => err);
  };

  return (
    <div className="border bg-[rgba(206,228,213,0.3)] h-screen ">
      <form
        className="flex flex-col max-w-[18rem] mx-auto mt-[5rem]"
        onSubmit={onSumbitLogin}
      >
        <h1 className="text-5xl text-center my-[3rem]">HealthT</h1>
        <TextInput
          state={name}
          setState={setName}
          type="text"
          placeholder="Name"
        />
        <TextInput
          state={password}
          setState={setPassword}
          type="password"
          placeholder="Password"
        />
        <div className=" flex justify-between mt-[3rem]">
          <button className="text-sm underline hover:text-[#28D5BC]">
            <NavLink to="/new">New? Sign Up here!</NavLink>
          </button>
          <Button type="submit" placeholder="Log in" />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
