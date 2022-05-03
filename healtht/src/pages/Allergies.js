import React from "react";
import { useSelector } from "react-redux";
import AllergyCard from "../components/AllergyCard";
import AllergyEntry from "../components/AllergyEntry";
import Header from "../components/Header";
import { selectUser } from "../redux/userSlice";

const Allergies = () => {
  const user = useSelector(selectUser);

  return (
    <div className="h-screen bg-[rgba(206,228,213,0.3)] sm:flex">
      <div className="sm:flex sm:h-full">
        <Header />
      </div>
      <div className="h-full max-w-[70%] mx-auto min-w-[300px] sm:max-w-[50%] sm:min-w-[400px] bg-[#E8F3F1] overflow-auto">
        <h1>New allergy:</h1>
        <AllergyEntry />
        {user.allergies.map((allergy, index) => (
          <AllergyCard
            index={index}
            allergy_id={allergy.allergy_id}
            name={allergy.name}
            date={allergy.date}
            symptoms={allergy.symptoms}
          />
        ))}
      </div>
    </div>
  );
};

export default Allergies;
