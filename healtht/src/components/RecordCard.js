import React from "react";
import DelIcon from "../svg/DelIcon";
import EditIcon from "../svg/EditIcon";
import Button from "./Button";

const RecordCard = (props) => {
  return (
    <div id={props.record_id}>
      <p>
        {props.date} - {props.time}
      </p>
      <p>{props.description}</p>
      <p>{props.trigger}</p>
      <p>{props.pain_score}</p>
      <Button title="Edit" type="button" placeholder={<EditIcon />} />
      <Button title="Delete" type="button" placeholder={<DelIcon />} />
    </div>
  );
};

export default RecordCard;
