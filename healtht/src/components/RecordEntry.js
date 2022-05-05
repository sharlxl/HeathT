import React, { useState } from "react";
import Button from "./Button";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { ADD_RECORD, selectUser } from "../redux/userSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const RecordEntry = () => {
  const [record, setRecord] = useState({
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    record_id: uuidv4(),
    description: "",
    trigger: "",
    pain_score: 0,
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
      return { ...prevState, pain_score: e.target.value };
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

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const onSubmitRecord = (e) => {
    e.preventDefault();
    dispatch(ADD_RECORD({ record }));
    axios
      .post(`http://localhost:5001/records/new`, {
        user_id: user.user_id,
        record,
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
    console.log(record);
    setRecord({
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      record_id: uuidv4(),
      description: "",
      trigger: "",
      pain_score: 0,
      painDescription: "No Pain",
    });
    console.log(record);
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
      <form onSubmit={onSubmitRecord}>
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-[#6D9B91]"
        >
          How are you feeling today?
        </label>
        <textarea
          id="description"
          value={record.description}
          onChange={onChangeDesc}
          rows="4"
          className="block p-2.5 w-full text-sm text-[#344B46] bg-[#D8E2E0] rounded-lg border border-[#6D9B91] focus:outline-[#28D5BC] caret-[#6D9B91]"
          placeholder="What happened? What are you feeling? what is the issue? etc"
          required
        />
        <label
          htmlFor="trigger"
          className="block mb-2 text-sm font-medium text-[#6D9B91]"
        >
          Any Triggering Factors?
        </label>
        <textarea
          id="trigger"
          value={record.trigger}
          onChange={onChangeTrigger}
          rows="2"
          className="block p-2.5 w-full text-sm text-[#344B46] bg-[#D8E2E0] rounded-lg border border-[#6D9B91] focus:outline-[#28D5BC] caret-[#6D9B91]"
          placeholder="What could have cause it? What made it worse? what did you do prior to feeling the symptoms/discomfort?"
        />
        <label
          htmlFor="pain"
          className="block mb-2 text-sm font-medium text-[#6D9B91]"
        >
          Any pain associated with it?
          <span className="float-right">
            {record.pain_score} - {record.painDescription}
          </span>
        </label>
        <div className="w-full accent-[#28D5BC]">
          <input
            onChange={onChangePainScore}
            type="range"
            list="tickmarks"
            value={record.pain_score}
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
    </>
  );
};

export default RecordEntry;
