import React, { useState } from "react";
import Button from "./Button";
import EditIcon from "../svg/EditIcon";
import DelIcon from "../svg/DelIcon";
import { useDispatch } from "react-redux";
import { DEL_ALLERGY, EDIT_ALLERGY } from "../redux/userSlice";
import Modal from "./Modal";

const AllergyCard = (props) => {
  const [edit, setEdit] = useState(false);
  const [editValues, setEditValues] = useState({
    date: "",
    name: "",
    symptoms: [],
  });

  const onClickEdit = () => {
    setEditValues({
      date: props.date,
      name: props.name,
      symptoms: props.symptoms,
    });
    setEdit(true);
  };

  const onChangeDate = (e) => {
    setEditValues((prevState) => {
      return { ...prevState, date: e.target.value };
    });
  };
  const onChangeCondition = (e) => {
    setEditValues((prevState) => {
      return { ...prevState, name: e.target.value };
    });
  };
  const onChangeSymptoms = (e) => {
    setEditValues((prevState) => {
      return { ...prevState, symptoms: e.target.value };
    });
  };

  const onClickClose = () => {
    setEdit(false);
  };
  const dispatch = useDispatch();
  const onSubmitSave = (e) => {
    e.preventDefault();
    const index = props.index;
    dispatch(EDIT_ALLERGY({ index, editValues }));
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
    dispatch(DEL_ALLERGY({ index }));
    setCheckDel(false);
  };

  return (
    <>
      {checkDel && (
        <Modal
          title="Allergy"
          delCheckModal={delCheckModal}
          onClickDel={onClickDel}
        />
      )}
      {edit ? (
        <form onSubmit={onSubmitSave}>
          <input type="text" value={editValues.date} onChange={onChangeDate} />
          <input
            type="text"
            value={editValues.name}
            onChange={onChangeCondition}
          />
          <input
            type="text"
            value={editValues.symptoms}
            onChange={onChangeSymptoms}
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
        <div id={props.allergy_id}>
          <p>{props.date}</p>
          <p>{props.name}</p>
          <p>{props.symptoms}</p>
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

export default AllergyCard;
