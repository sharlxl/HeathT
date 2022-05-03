import React, { useState } from "react";
import Button from "./Button";
import { v4 as uuidv4 } from "uuid";
import { ADD_CONDTION } from "../redux/userSlice";
import { useDispatch } from "react-redux";

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

  const dispatch = useDispatch();
  const onSubmitCondition = (e) => {
    e.preventDefault();
    // console.log(condition);
    dispatch(ADD_CONDTION({ condition }));
    setCondition({
      condition_id: uuidv4(),
      date_of_diagnosis: "",
      condition: "",
    });
  };

  return (
    <form onSubmit={onSubmitCondition}>
      <label
        htmlFor="date"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        Date:
      </label>
      <input
        id="date"
        type="date"
        value={condition.date_of_diagnosis}
        onChange={onChangeDate}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder=""
      />

      <label
        htmlFor="condition"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        Condition:
      </label>
      <input
        id="condition"
        type="text"
        value={condition.condition}
        onChange={onChangeCondition}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="What condition were you diagnosed?"
        required
      />

      <Button type="submit" placeholder="Submit" />
    </form>
  );
};

export default CondtionEntry;
