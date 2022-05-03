import React from "react";
import Button from "./Button";
import EditIcon from "../svg/EditIcon";
import DelIcon from "../svg/DelIcon";

const AllergyCard = (props) => {
  return (
    <div id={props.allergy_id}>
      <p>{props.date}</p>
      <p>{props.name}</p>
      <p>{props.symptoms}</p>
      <Button type="button" placeholder={<EditIcon />} />
      <Button type="button" placeholder={<DelIcon />} />
    </div>
  );
};

export default AllergyCard;
