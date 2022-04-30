import React from "react";
import Header from "../components/Header";
import FAQAccordion from "../components/FAQAccordion";

const FAQPage = () => {
  return (
    <div className="h-screen bg-[rgba(206,228,213,0.3)]">
      <div className="sm:flex sm:h-full">
        <Header />
        <div className="w-[20rem] sm:w-[30rem] mx-auto sm:ml-[2rem]">
          <h1>FAQ</h1>
          <FAQAccordion />
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
