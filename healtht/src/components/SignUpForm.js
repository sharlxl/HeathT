import React, { useState } from "react";
import Button from "./Button";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/userSlice";

const SignUpForm = () => {
  const [newSignUp, setNewSignUp] = useState({
    user_id: uuidv4(),
    name: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onChangeName = (e) => {
    setNewSignUp((prevState) => {
      return { ...prevState, name: e.target.value };
    });
  };
  const onChangePassword = (e) => {
    setNewSignUp((prevState) => {
      return { ...prevState, password: e.target.value };
    });
  };
  const onChangeConfirm = (e) => {
    setConfirmPassword(e.target.value);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmitForm = (e) => {
    e.preventDefault();
    if (newSignUp.password.length < 8) {
      setError(true);
      setErrorMessage("Password needs to have at least 8 characters");
      return;
    } else if (newSignUp.password !== confirmPassword) {
      setError(true);
      setErrorMessage("Password does not match");
      return;
    } else {
      setError(false);
      setErrorMessage("");
      console.log(newSignUp);
      axios
        .post("http://localhost:5001/users/create", {
          user_id: newSignUp.user_id,
          name: newSignUp.name,
          password: newSignUp.password,
        })
        .then((res) => {
          console.log(res.data);
          // let token = res.data.token;
          // localStorage.setItem("SavedToken", "Bearer " + token);
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
        });
    }
    dispatch(LOGIN(newSignUp));
    setNewSignUp({ user_id: uuidv4(), name: "", password: "" });
    setConfirmPassword("");
    navigate("/main");
  };

  const onClickBack = () => {
    navigate("/");
  };

  return (
    <form onSubmit={onSubmitForm}>
      <label
        htmlFor="name"
        className="block mb-2 text-sm font-medium text-[#6D9B91]"
      >
        Name:
      </label>
      <input
        id="name"
        type="text"
        value={newSignUp.name}
        onChange={onChangeName}
        className="block p-2.5 w-full text-sm text-[#344B46] bg-[#D8E2E0] rounded-lg border border-[#6D9B91] focus:outline-[#28D5BC]"
        placeholder="What is your name?"
      />
      <label
        htmlFor="password"
        className="block mb-2 text-sm font-medium text-[#6D9B91]"
      >
        Password:
      </label>

      <input
        id="password"
        type="password"
        value={newSignUp.password}
        onChange={onChangePassword}
        className="block p-2.5 w-full text-sm text-[#344B46] bg-[#D8E2E0] rounded-lg border border-[#6D9B91] focus:outline-[#28D5BC]"
        placeholder="Please enter a password"
      />

      <label
        htmlFor="confirmPassword"
        className="block mb-2 text-sm font-medium text-[#6D9B91]"
      >
        Confirm your password:
      </label>
      <input
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={onChangeConfirm}
        className="block p-2.5 w-full text-sm text-[#344B46] bg-[#D8E2E0] rounded-lg border border-[#6D9B91] focus:outline-[#28D5BC]"
        placeholder="Confirm your password"
      />
      {error ? (
        <p className="text-red-500 text-sm h-14 text-center py-2">
          {errorMessage}
        </p>
      ) : (
        <div className="h-14"> </div>
      )}
      <Button type="submit" placeholder="SUBMIT" />
      <div className="float-left">
        <Button onClick={onClickBack} type="button" placeholder="BACK" />
      </div>
    </form>
  );
};

export default SignUpForm;
