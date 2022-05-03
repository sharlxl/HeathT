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
        <form onSubmit={onSubmitSave}>
          <input
            type="text"
            value={editValues.date_of_diagnosis}
            onChange={onChangeDate}
          />
          <input
            type="text"
            value={editValues.condition}
            onChange={onChangeCondition}
          />
          <Button title="Save Change" type="Submit" placeholder="Save Change" />
          <Button
            title="Close"
            type="button"
            onClick={onClickClose}
            placeholder="Close"
          />
        </form>
      ) : (
        <div id={props.condition_id}>
          <p>{props.date_of_diagnosis}</p>
          <p>{props.condition}</p>
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
