import React from "react";
import Header from "../components/Header";

const MainPage = () => {
  return (
    <div className="h-screen bg-[rgba(206,228,213,0.3)] sm:flex">
      <div className="sm:flex sm:h-full">
        <Header />
      </div>
      <div className="h-full max-w-[70%] mx-auto min-w-[300px] sm:max-w-[50%] sm:min-w-[400px] bg-[#E8F3F1] overflow-auto">
        <h1 className="text-4xl">Hi, Name</h1>
        <p>displayed info</p>
      </div>
    </div>
  );
};

export default MainPage;
