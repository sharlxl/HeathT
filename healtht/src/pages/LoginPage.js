import React, { useState } from "react";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

const LoginPage = () => {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  console.log("name", name);
  console.log("password", password);

  const onSumbitLogin = (e) => {
    e.preventDefault();
    console.log(name, password);
    //   axios
    //     .post(
    //       "http://localhost:5001/users/login",
    //       { email, password },
    //       { withCredentials: true }
    //     )
    //     .then((res) => {
    //       if (res.data.status === "ok") {
    //         const currentUser = users.find((user) => {
    //           if (user.email === email) {
    //             return user;
    //           }
    //         });
    //         //stores only current user data into a userSlice
    //         dispatch(
    //           LOGIN({
    //             ...currentUser,
    //           })
    //         );
    //         navigate("/main");
    //       }
    //     }) //axios try catch function to capture the errors
    //     .catch((err) => alert("Log in failed, invalid credentials", err));
    // };
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
            New? Sign Up here!
          </button>
          <Button type="submit" placeholder="Log in" />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
