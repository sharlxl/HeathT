import React, { useState } from "react";
import Button from "./Button";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { ADD_ALLERGY } from "../redux/userSlice";

const AllergyEntry = () => {
  const [allergy, setAllergy] = useState({
    allergy_id: uuidv4(),
    date: "",
    name: "",
    symptoms: [],
  });
  const [symptomsString, setSymptomsString] = useState("");

  console.log(allergy);
  const onChangeDate = (e) => {
    setAllergy((prevState) => {
      return { ...prevState, date: e.target.value };
    });
  };

  const onChangeName = (e) => {
    setAllergy((prevState) => {
      return { ...prevState, name: e.target.value };
    });
  };

  const onChangeSymptoms = (e) => {
    e.preventDefault();
    setSymptomsString(e.target.value);
    const splitSymptoms = symptomsString
      .split(".")
      .map((symptom) => symptom.trim());
    setAllergy((prevState) => {
      return { ...prevState, symptoms: splitSymptoms };
    });
  };
  const dispatch = useDispatch();
  const onSubmitAllergy = (e) => {
    e.preventDefault();
    dispatch(ADD_ALLERGY({ allergy }));
    // console.log(allergy);

    setAllergy({
      allergy_id: uuidv4(),
      date: "",
      name: "",
      symptoms: [],
    });
    setSymptomsString("");
  };

  return (
    <form onSubmit={onSubmitAllergy}>
      <label
        htmlFor="date"
        className="block mb-2 text-sm font-medium text-[#6D9B91]"
      >
        Date:
      </label>
      <input
        id="date"
        type="date"
        value={allergy.date}
        onChange={onChangeDate}
        className="block p-2.5 w-full text-sm text-[#344B46] bg-[#D8E2E0] rounded-lg border border-[#6D9B91] focus:outline-[#28D5BC]"
        placeholder=""
      />

      <label
        htmlFor="name"
        className="block mb-2 text-sm font-medium text-[#6D9B91]"
      >
        Name:
      </label>
      <input
        id="name"
        type="text"
        value={allergy.name}
        onChange={onChangeName}
        className="block p-2.5 w-full text-sm text-[#344B46] bg-[#D8E2E0] rounded-lg border border-[#6D9B91] focus:outline-[#28D5BC]"
        placeholder="What are you allergic to?"
        required
      />
      <label
        htmlFor="symptoms"
        className="block mb-2 text-sm font-medium text-[#6D9B91]"
      >
        Symptoms: (seperate your symptoms with a .)
      </label>
      <input
        id="symptoms"
        type="text"
        value={symptomsString}
        onChange={onChangeSymptoms}
        className="block p-2.5 w-full text-sm text-[#344B46] bg-[#D8E2E0] rounded-lg border border-[#6D9B91] focus:outline-[#28D5BC]"
        placeholder="what symptoms do you exhibit?"
        required
      />
      <div className="h-14"> </div>
      <Button type="submit" placeholder="Submit" />
    </form>
  );
};

export default AllergyEntry;
