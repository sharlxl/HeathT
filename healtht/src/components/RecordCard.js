import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { DEL_RECORD, EDIT_RECORD } from "../redux/userSlice";
import DelIcon from "../svg/DelIcon";
import EditIcon from "../svg/EditIcon";
import Button from "./Button";
import Modal from "./Modal";

const RecordCard = (props) => {
  const [edit, setEdit] = useState(false);
  const [editValues, setEditValues] = useState({
    description: "",
    trigger: "",
    pain_score: 0,
  });

  const [painDescription, setPainDescription] = useState("");

  const onClickEdit = () => {
    setEditValues({
      description: props.description,
      trigger: props.trigger,
      pain_score: props.pain_score,
    });
    setEdit(true);
  };

  const onChangeDescription = (e) => {
    setEditValues((prevState) => {
      return { ...prevState, description: e.target.value };
    });
  };
  const onChangeTrigger = (e) => {
    setEditValues((prevState) => {
      return { ...prevState, trigger: e.target.value };
    });
  };
  const onChangePain = (e) => {
    setEditValues((prevState) => {
      return { ...prevState, pain_score: e.target.value };
    });
    if (e.target.value > 0 && e.target.value < 4) {
      setPainDescription("Mild Pain");
    } else if (e.target.value > 3 && e.target.value < 7) {
      setPainDescription("Moderate Pain");
    } else if (e.target.value > 6 && e.target.value <= 9) {
      setPainDescription("Severe Pain");
    } else if (e.target.value >= 10) {
      setPainDescription("Worst Pain Ever");
    }
  };

  const onClickClose = () => {
    setEdit(false);
  };
  const dispatch = useDispatch();
  const onSubmitSave = (e) => {
    e.preventDefault();
    const index = props.index;
    dispatch(EDIT_RECORD({ index, editValues }));
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
    dispatch(DEL_RECORD({ index }));
    setCheckDel(false);
  };
  return (
    <>
      {checkDel && (
        <Modal
          title="Record"
          delCheckModal={delCheckModal}
          onClickDel={onClickDel}
        />
      )}
      {edit ? (
        <div className="mt-14">
          <form className="flex flex-col" onSubmit={onSubmitSave}>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-[#6D9B91]"
            >
              How are you feeling today?
            </label>
            <textarea
              id="description"
              className=" my-1 p-2.5 w-full text-sm text-[#344B46] bg-[#D8E2E0] rounded-lg border border-[#6D9B91] focus:outline-[#28D5BC]"
              type="textarea"
              rows="4"
              value={editValues.description}
              onChange={onChangeDescription}
            />
            <label
              htmlFor="trigger"
              className="block mb-2 text-sm font-medium text-[#6D9B91]"
            >
              Any Triggering Factors?
            </label>
            <textarea
              id="trigger"
              className=" my-1 p-2.5 w-full text-sm text-[#344B46] bg-[#D8E2E0] rounded-lg border border-[#6D9B91] focus:outline-[#28D5BC]"
              type="textarea"
              rows="2"
              value={editValues.trigger}
              onChange={onChangeTrigger}
            />
            <label
              htmlFor="pain"
              className="block mb-2 text-sm font-medium text-[#6D9B91]"
            >
              Any pain associated with it?
              <span className="float-right">
                {editValues.pain_score} - {painDescription}
              </span>
            </label>
            <input
              className="w-full"
              onChange={onChangePain}
              type="range"
              list="tickmarks"
              value={editValues.pain_score}
              min="0"
              max="10"
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
        <div className="mt-14" id={props.record_id}>
          <p className="rounded-t-md pl-5 py-1 text-xl bg-[#9FDFD1]">
            {props.date} - {props.time}
          </p>
          <p>Record:</p>
          <p className="ml-2 pl-5 py-1 border-t border-l-2 border-[#9FDFD1]">
            {props.description}
          </p>
          <p>Triggers:</p>
          <p className="ml-2 pl-5 py-1 border-t border-l-2 border-[#9FDFD1]">
            {props.trigger}
          </p>
          <p className="">
            Pain Score:
            <span class="px-1.5 ml-3 rounded-md bg-[#9FDFD1]">
              {props.pain_score}
            </span>
          </p>
          <Button
            title="Edit"
            type="button"
            placeholder={<EditIcon />}
            onClick={onClickEdit}
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

export default RecordCard;
