import React, { useState } from "react";
import Button from "./Button";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const SignUpForm = () => {
  const [newSignUp, setNewSignUp] = useState({
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
          user_id: uuidv4(),
          name: newSignUp.name,
          password: newSignUp.password,
        })
        .then((res) => {
          console.log(res.data);
          let token = res.data.token;
          localStorage.setItem("SavedToken", "Bearer " + token);
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
        });
    }
    setNewSignUp({ name: "", password: "" });
    setConfirmPassword("");
  };

  return (
    <form onSubmit={onSubmitForm}>
      <label
        htmlFor="name"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        Name:
      </label>
      <input
        id="name"
        type="text"
        value={newSignUp.name}
        onChange={onChangeName}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="What is your name?"
      />
      <label
        htmlFor="password"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        Password:
      </label>

      <input
        id="password"
        type="password"
        value={newSignUp.password}
        onChange={onChangePassword}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Please enter a password"
      />

      <label
        htmlFor="confirmPassword"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        Confirm your password:
      </label>
      <input
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={onChangeConfirm}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Confirm your password"
      />
      {error ? <span>{errorMessage}</span> : ""}
      <Button type="submit" placeholder="submit" />
    </form>
  );
};

export default SignUpForm;
