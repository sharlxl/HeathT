import React from "react";
import Header from "../components/Header";

const MainPage = () => {
  return (
    <div className="h-screen bg-[rgba(206,228,213,0.3)]">
      <div className="sm:flex sm:h-full">
        <Header />
        <h1>MainPage</h1>
      </div>
    </div>
  );
};

export default MainPage;
