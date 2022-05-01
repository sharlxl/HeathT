import React from "react";
import Header from "../components/Header";
import CondtionEntry from "../components/CondtionEntry";

const Conditions = () => {
  return (
    <div className="h-screen bg-[rgba(206,228,213,0.3)] sm:flex">
      <div className="sm:flex sm:h-full">
        <Header />
      </div>
      <div className="h-full max-w-[70%] mx-auto min-w-[300px] sm:max-w-[50%] sm:min-w-[400px] bg-[#E8F3F1] overflow-auto">
        <h1>New condition:</h1>
        <CondtionEntry />
        <p>existing conditions</p>
      </div>
    </div>
  );
};

export default Conditions;
