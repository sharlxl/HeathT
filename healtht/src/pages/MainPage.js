import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { selectUser } from "../redux/userSlice";

const MainPage = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  if (!user) {
    alert("Please Log in");
    navigate("/");
  }

  return (
    <div className="h-screen bg-[rgba(206,228,213,0.3)] sm:flex">
      <div className="sm:flex sm:h-full">
        <Header />
      </div>
      <div className="pt-10 px-5 text-[#344B46] h-full max-w-[70%] mx-auto min-w-[300px] sm:max-w-[50%] sm:min-w-[400px] bg-[#E8F3F1] overflow-auto">
        <h1 className="text-4xl mb-5">Your Summary</h1>
        <p className="">Number of Allergies:</p>
        <p className="text-xl bg-slate-100 mx-2 pl-2">
          {user.allergies ? user.allergies.length : 0}
        </p>
        <p>Conditions:</p>
        <ul className="text-xl bg-slate-100 mx-2 pl-2">
          {user.medical_conditions ? (
            user.medical_conditions.map((condition, index) => (
              <li key={index}>{condition.condition}</li>
            ))
          ) : (
            <li></li>
          )}
        </ul>
        <p>Number of Record Entries:</p>
        <p className="text-xl bg-slate-100 mx-2 pl-2">
          {user.records ? user.records.length : 0}
        </p>
      </div>
    </div>
  );
};

export default MainPage;
