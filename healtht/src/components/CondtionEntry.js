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
  );
};

export default CondtionEntry;
