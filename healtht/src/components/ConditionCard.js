import React from "react";
import Button from "./Button";
import EditIcon from "../svg/EditIcon";
import DelIcon from "../svg/DelIcon";

const ConditionCard = (props) => {
  return (
    <div id={props.condition_id}>
      <p>{props.date_of_diagnosis}</p>
      <p>{props.condition}</p>
      <Button title="Edit" type="button" placeholder={<EditIcon />} />
      <Button title="Delete" type="button" placeholder={<DelIcon />} />
    </div>
  );
};

export default ConditionCard;
