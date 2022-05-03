import React, { useState } from "react";
import Button from "./Button";

const AllergyEntry = () => {
  const [allergy, setAllergy] = useState({
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
  };

  const onSubmitAllergy = (e) => {
    e.preventDefault();
    const splitSymptoms = symptomsString
      .split(".")
      .map((symptom) => symptom.trim());
    setAllergy((prevState) => {
      return { ...prevState, symptoms: splitSymptoms };
    });

    console.log(allergy);

    setAllergy({
      date: "",
      name: "",
      symptoms: [],
    });
  };

  return (
    <form onSubmit={onSubmitAllergy}>
      <label
        htmlFor="date"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        Date:
      </label>
      <input
        id="date"
        type="date"
        value={allergy.date}
        onChange={onChangeDate}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder=""
      />

      <label
        htmlFor="name"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        Name:
      </label>
      <input
        id="name"
        type="text"
        value={allergy.name}
        onChange={onChangeName}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="What are you allergic to?"
      />
      <label
        htmlFor="symptoms"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        Symptoms: (seperate your symptoms with a .)
      </label>
      <input
        id="symptoms"
        type="text"
        value={symptomsString}
        onChange={onChangeSymptoms}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="what symptoms do you exhibit?"
      />

      <Button type="submit" placeholder="Submit" />
    </form>
  );
};

export default AllergyEntry;
