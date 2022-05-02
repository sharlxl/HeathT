import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import axios from "axios";

const LoginPage = () => {
  // const userContext = useContext(userContext);
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  console.log("name", name);
  console.log("password", password);

  const onSumbitLogin = (e) => {
    e.preventDefault();
    console.log(name, password);
    // axios
    //   .post(
    //     "http://localhost:5001/user/login",
    //     { name, password }
    //     //       { withCredentials: true }
    //   )
    //   .then(
    //     (res) => {}
    //     // navigate("/main")
    //   ) //axios try catch function to capture the errors
    //   .catch((err) => err);
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
