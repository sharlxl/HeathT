import React, { useState } from "react";
import Button from "./Button";
import EditIcon from "../svg/EditIcon";
import DelIcon from "../svg/DelIcon";
import { useDispatch, useSelector } from "react-redux";
import { DEL_ALLERGY, EDIT_ALLERGY, selectUser } from "../redux/userSlice";
import Modal from "./Modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AllergyCard = (props) => {
  const [edit, setEdit] = useState(false);
  const [editValues, setEditValues] = useState({
    date: "",
    name: "",
    symptoms: [],
  });

  const [convertedSymptoms, setConvertedSymptoms] = useState("");

  const onClickEdit = () => {
    // console.log(props.symptoms.join());

    setEditValues({
      date: props.date,
      name: props.name,
      symptoms: props.symptoms,
    });
    setConvertedSymptoms(props.symptoms.join());
    setEdit(true);
  };

  const onChangeDate = (e) => {
    setEditValues((prevState) => {
      return { ...prevState, date: e.target.value };
    });
  };
  const onChangeName = (e) => {
    setEditValues((prevState) => {
      return { ...prevState, name: e.target.value };
    });
  };
  const onChangeSymptoms = (e) => {
    setConvertedSymptoms(e.target.value);
    setEditValues((prevState) => {
      return { ...prevState, symptoms: convertedSymptoms.split(",") };
    });
  };

  const onClickClose = () => {
    setEdit(false);
  };

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const onSubmitSave = (e) => {
    e.preventDefault();
    console.log(editValues);
    const index = props.index;
    dispatch(EDIT_ALLERGY({ index, editValues }));
    axios
      .put(`http://localhost:5001/allergies/edit`, {
        user_id: user.user_id,
        allergy_id: props.allergy_id,
        name: editValues.name,
        date: editValues.date,
        symptoms: editValues.symptoms,
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
    setEdit(false);
  };

  const [checkDel, setCheckDel] = useState(false);
  const onClickDel = () => {
    const index = props.index;
    dispatch(DEL_ALLERGY({ index }));
    axios
      .delete(`http://localhost:5001/allergies/delete`, {
        data: {
          user_id: user.user_id,
          allergy_id: props.allergy_id,
        },
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
    setCheckDel(false);
  };

  const delCheckModal = () => {
    if (checkDel) {
      setCheckDel(false);
    } else {
      setCheckDel(true);
    }
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
      {checkDel && (
        <Modal
          title="Allergy"
          delCheckModal={delCheckModal}
          onClickDel={onClickDel}
        />
      )}
      {edit ? (
        <div className="mt-14">
          <form className="flex flex-col" onSubmit={onSubmitSave}>
            <label
              htmlFor="date"
              className="block mb-2 text-sm font-medium text-[#6D9B91]"
            >
              Date:
            </label>
            <input
              id="date"
              className=" my-1 p-2.5 w-full text-sm text-[#344B46] bg-[#D8E2E0] rounded-lg border border-[#6D9B91] focus:outline-[#28D5BC]"
              type="date"
              value={editValues.date}
              onChange={onChangeDate}
            />
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-[#6D9B91]"
            >
              Name:
            </label>
            <input
              id="name"
              className=" my-1 p-2.5 w-full text-sm text-[#344B46] bg-[#D8E2E0] rounded-lg border border-[#6D9B91] focus:outline-[#28D5BC]"
              type="text"
              value={editValues.name}
              onChange={onChangeName}
            />
            <label
              htmlFor="symptoms"
              className="block mb-2 text-sm font-medium text-[#6D9B91]"
            >
              Symptoms: (seperate your symptoms with a .)
            </label>
            <input
              id="symptoms"
              className=" my-1 p-2.5 w-full text-sm text-[#344B46] bg-[#D8E2E0] rounded-lg border border-[#6D9B91] focus:outline-[#28D5BC]"
              type="text"
              value={convertedSymptoms}
              onChange={onChangeSymptoms}
            />
            <div className="flex justify-between">
              <Button
                title="Save Changes"
                type="Submit"
                placeholder="Save Changes"
              />
              <Button
                title="Close"
                type="button"
                onClick={onClickClose}
                placeholder="Close"
              />
            </div>
          </form>
        </div>
      ) : (
        <div className="mt-14">
          <p className="pl-5 py-1">Diagnosed on {props.date}</p>
          <p className="pl-5 py-1 text-xl bg-[#9FDFD1] rounded-tl-md">
            {props.name}
          </p>
          <div className=" rounded-br-md border-b-2 border-x-2 border-[#9FDFD1] bg-[#E8F3F1]">
            {props.symptoms.map((symptom, index) => {
              return (
                <p key={index} className="pl-5 py-2">
                  {symptom}
                </p>
              );
            })}
          </div>

          <Button
            onClick={delCheckModal}
            title="Delete"
            type="button"
            placeholder={<DelIcon />}
          />
          <Button
            title="Edit"
            type="button"
            placeholder={<EditIcon />}
            onClick={onClickEdit}
          />
        </div>
      )}
    </>
  );
};

export default AllergyCard;
