import React, { useState } from "react";
import Button from "./Button";
import EditIcon from "../svg/EditIcon";
import DelIcon from "../svg/DelIcon";
import { useDispatch } from "react-redux";
import { DEL_CONDITION, EDIT_CONDITION } from "../redux/userSlice";
import Modal from "./Modal";

const ConditionCard = (props) => {
  const [edit, setEdit] = useState(false);
  const [editValues, setEditValues] = useState({
    date_of_diagnosis: "",
    condition: "",
  });

  const onClickEdit = () => {
    setEditValues({
      date_of_diagnosis: props.date_of_diagnosis,
      condition: props.condition,
    });
    setEdit(true);
  };

  const onChangeDate = (e) => {
    setEditValues((prevState) => {
      return { ...prevState, date_of_diagnosis: e.target.value };
    });
  };
  const onChangeCondition = (e) => {
    setEditValues((prevState) => {
      return { ...prevState, condition: e.target.value };
    });
  };

  const onClickClose = () => {
    setEdit(false);
  };
  const dispatch = useDispatch();
  const onSubmitSave = (e) => {
    e.preventDefault();
    const index = props.index;
    dispatch(EDIT_CONDITION({ index, editValues }));
    setEdit(false);
  };

  const [checkDel, setCheckDel] = useState(false);

  const delCheckModal = () => {
    if (checkDel) {
      setCheckDel(false);
    } else {
      setCheckDel(true);
    }
  };

  const onClickDel = () => {
    const index = props.index;
    dispatch(DEL_CONDITION({ index }));
    setCheckDel(false);
  };

  return (
    <>
      {checkDel && (
        <Modal
          title="Medical Condition"
          delCheckModal={delCheckModal}
          onClickDel={onClickDel}
        />
      )}
      {edit ? (
        <div className="mt-14">
          <form className="flex flex-col" onSubmit={onSubmitSave}>
            <label
              htmlFor="condition"
              className="block mb-2 text-sm font-medium text-[#6D9B91]"
            >
              Name:
            </label>
            <input
              id="conditions"
              className=" my-1 p-2.5 w-full text-sm text-[#344B46] bg-[#D8E2E0] rounded-lg border border-[#6D9B91] focus:outline-[#28D5BC]"
              type="text"
              value={editValues.condition}
              onChange={onChangeCondition}
            />
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
              value={editValues.date_of_diagnosis}
              onChange={onChangeDate}
            />
            <div className="flex justify-between">
              <Button
                title="Save Change"
                type="Submit"
                placeholder="Save Change"
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
        <div className="mt-14" id={props.condition_id}>
          <p className="pl-5 py-1 text-xl bg-[#9FDFD1] rounded-md">
            {props.condition}
          </p>
          <p className="pl-5 py-1"> Since {props.date_of_diagnosis}</p>
          <Button
            title="Edit"
            type="button"
            onClick={onClickEdit}
            placeholder={<EditIcon />}
          />
          <Button
            onClick={delCheckModal}
            title="Delete"
            type="button"
            placeholder={<DelIcon />}
          />
        </div>
      )}
    </>
  );
};

export default ConditionCard;
