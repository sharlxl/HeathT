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
        <form onSubmit={onSubmitSave}>
          <input
            type="textarea"
            value={editValues.description}
            onChange={onChangeDescription}
          />
          <input
            type="text"
            value={editValues.trigger}
            onChange={onChangeTrigger}
          />
          <input
            onChange={onChangePain}
            type="range"
            list="tickmarks"
            value={editValues.pain_score}
            min="0"
            max="10"
            className="w-full"
          />
          <span>
            {editValues.pain_score} - {painDescription}
          </span>
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

          <Button title="Save Change" type="Submit" placeholder="Save Change" />
          <Button
            title="Close"
            type="button"
            onClick={onClickClose}
            placeholder="Close"
          />
        </form>
      ) : (
        <div id={props.record_id}>
          <p>
            {props.date} - {props.time}
          </p>
          <p>{props.description}</p>
          <p>{props.trigger}</p>
          <p>{props.pain_score}</p>
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
