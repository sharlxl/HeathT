import React, { useState } from "react";
import Button from "./Button";

const RecordEntry = () => {
  const [record, setRecord] = useState({
    date: new Date().toISOString(),
    time: new Date().toISOString(),
    description: "",
    trigger: "",
    pain: 0,
    painDescription: "No Pain",
  });

  const onChangeDesc = (e) => {
    setRecord((prevState) => {
      return { ...prevState, description: e.target.value };
    });
  };

  const onChangeTrigger = (e) => {
    setRecord((prevState) => {
      return { ...prevState, trigger: e.target.value };
    });
  };
  // const [pain, setPain] = useState(0);
  // const [painLabel, setPainLabel] = useState("No Pain");

  const onChangePainScore = (e) => {
    setRecord((prevState) => {
      return { ...prevState, pain: e.target.value };
    });
    if (e.target.value > 0 && e.target.value < 4) {
      setRecord((prevState) => {
        return { ...prevState, painDescription: "Mild Pain" };
      });
    } else if (e.target.value > 3 && e.target.value < 7) {
      setRecord((prevState) => {
        return { ...prevState, painDescription: "Moderate Pain" };
      });
    } else if (e.target.value > 6 && e.target.value <= 9) {
      setRecord((prevState) => {
        return { ...prevState, painDescription: "Severe Pain" };
      });
    } else if (e.target.value >= 10) {
      setRecord((prevState) => {
        return { ...prevState, painDescription: "Worst Pain Ever" };
      });
    }
  };

  const onSubmitRecord = (e) => {
    e.preventDefault();
    console.log(record);
    setRecord({
      date: "",
      time: "",
      description: "",
      trigger: "",
      pain: 0,
      painDescription: "No Pain",
    });
  };
  return (
    <form onSubmit={onSubmitRecord}>
      <label
        htmlFor="description"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        How are you feeling today?
      </label>
      <textarea
        id="description"
        value={record.description}
        onChange={onChangeDesc}
        rows="4"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="What happened? What are you feeling? what is the issue? etc"
      />
      <label
        htmlFor="trigger"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        Any Triggering Factors?
      </label>
      <textarea
        id="trigger"
        value={record.trigger}
        onChange={onChangeTrigger}
        rows="2"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="What could have cause it? What made it worse? what did you do prior to feeling the symptoms/discomfort?"
      />
      <label
        htmlFor="pain"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        Any pain associated with it?{" "}
        <span>
          {record.pain} - {record.painDescription}
        </span>
      </label>
      <div className="w-full">
        <input
          onChange={onChangePainScore}
          type="range"
          list="tickmarks"
          value={record.pain}
          min="0"
          max="10"
          className="w-full"
        />
        <datalist id="tickmarks">
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </datalist>
      </div>
      <Button type="submit" placeholder="Submit" />
    </form>
  );
};

export default RecordEntry;
