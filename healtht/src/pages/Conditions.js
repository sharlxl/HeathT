import React from "react";
import Header from "../components/Header";
import CondtionEntry from "../components/CondtionEntry";
import ConditionCard from "../components/ConditionCard";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";

const Conditions = () => {
  const user = useSelector(selectUser);

  return (
    <div className="h-screen bg-[rgba(206,228,213,0.3)] sm:flex">
      <div className="sm:flex sm:h-full">
        <Header />
      </div>
      <div className="text-[#344B46] pt-10 px-5 h-full max-w-[70%] mx-auto min-w-[300px] sm:max-w-[50%] sm:min-w-[400px] bg-[#E8F3F1] overflow-auto">
        <h1 className="text-4xl mb-5">My Conditions:</h1>
        <CondtionEntry />
        {user.medical_conditions
          .map((condition, index) => (
            <ConditionCard
              index={index}
              condition_id={condition.condition_id}
              condition={condition.condition}
              date_of_diagnosis={condition.date_of_diagnosis}
            />
          ))
          .reverse()}
      </div>
    </div>
  );
};

export default Conditions;
