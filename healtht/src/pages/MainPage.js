import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { selectUser } from "../redux/userSlice";

const MainPage = () => {
  const user = useSelector(selectUser);
  const styledName = user.name[0].toUpperCase() + user.name.substring(1);

  return (
    <div className="h-screen bg-[rgba(206,228,213,0.3)] sm:flex">
      <div className="sm:flex sm:h-full">
        <Header />
      </div>
      <div className="pt-10 px-5 text-[#344B46] h-full max-w-[70%] mx-auto min-w-[300px] sm:max-w-[50%] sm:min-w-[400px] bg-[#E8F3F1] overflow-auto">
        <h1 className="text-4xl mb-5">Hi, {styledName}</h1>
        <p className="">Number of Allergies:</p>
        <p className="text-xl bg-slate-100 mx-2 pl-2">
          {user.allergies.length}
        </p>
        <p>Conditions:</p>
        <ul className="text-xl bg-slate-100 mx-2 pl-2">
          {user.medical_conditions.map((condition) => (
            <li>{condition.condition}</li>
          ))}
        </ul>
        <p>Number of Record Entries:</p>
        <p className="text-xl bg-slate-100 mx-2 pl-2">{user.records.length}</p>
      </div>
    </div>
  );
};

export default MainPage;
