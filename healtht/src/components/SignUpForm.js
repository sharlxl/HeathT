import React, { useState } from "react";
import Button from "./Button";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/userSlice";

const STYLES = {
  label: "block mb-2 text-sm font-medium text-[#6D9B91]",
  input:
    "block p-2.5 w-full text-sm text-[#344B46] bg-[#D8E2E0] rounded-lg border border-[#6D9B91] focus:outline-[#28D5BC] caret-[#6D9B91]",
};

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
      <label htmlFor="name" className={STYLES.label}>
        Name:
      </label>
      <input
        id="name"
        type="text"
        value={newSignUp.name}
        onChange={onChangeName}
        className={STYLES.input}
        placeholder="What is your name?"
      />
      <label htmlFor="password" className={STYLES.label}>
        Password:
      </label>

      <input
        id="password"
        type="password"
        value={newSignUp.password}
        onChange={onChangePassword}
        className={STYLES.input}
        placeholder="Please enter a password"
      />

      <label htmlFor="confirmPassword" className={STYLES.label}>
        Confirm your password:
      </label>
      <input
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={onChangeConfirm}
        className={STYLES.input}
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
