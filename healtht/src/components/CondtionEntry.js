import React, { useState } from "react";
import Button from "./Button";
import { v4 as uuidv4 } from "uuid";
import { ADD_CONDTION, selectUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const CondtionEntry = () => {
  const [condition, setCondition] = useState({
    condition_id: uuidv4(),
    date_of_diagnosis: "",
    condition: "",
  });

  const onChangeDate = (e) => {
    setCondition((prevState) => {
      return { ...prevState, date_of_diagnosis: e.target.value };
    });
  };

  const onChangeCondition = (e) => {
    setCondition((prevState) => {
      return { ...prevState, condition: e.target.value };
    });
  };
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const onSubmitCondition = (e) => {
    e.preventDefault();
    // console.log(condition);
    dispatch(ADD_CONDTION({ condition }));
    axios
      .post(`http://localhost:5001/conditions/new`, {
        user_id: user.user_id,
        condition,
      })
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error(err, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    setCondition({
      condition_id: uuidv4(),
      date_of_diagnosis: "",
      condition: "",
    });
  };

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form onSubmit={onSubmitCondition}>
        <label
          htmlFor="date"
          className="block mb-2 text-sm font-medium text-[#6D9B91]"
        >
          Date:
        </label>
        <input
          id="date"
          type="date"
          value={condition.date_of_diagnosis}
          onChange={onChangeDate}
          className="block p-2.5 w-full text-sm text-[#344B46] bg-[#D8E2E0] rounded-lg border border-[#6D9B91] focus:outline-[#28D5BC]"
          placeholder=""
        />

        <label
          htmlFor="condition"
          className="block mb-2 text-sm font-medium text-[#6D9B91]"
        >
          Condition:
        </label>
        <input
          id="condition"
          type="text"
          value={condition.condition}
          onChange={onChangeCondition}
          className="block p-2.5 w-full text-sm text-[#344B46] bg-[#D8E2E0] rounded-lg border border-[#6D9B91] focus:outline-[#28D5BC]"
          placeholder="What condition were you diagnosed?"
          required
        />

        <Button type="submit" placeholder="Submit" />
      </form>
    </>
  );
};

export default CondtionEntry;
