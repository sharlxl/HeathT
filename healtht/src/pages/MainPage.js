import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { selectUser } from "../redux/userSlice";

const MainPage = () => {
  const user = useSelector(selectUser);
  console.log(user);

  return (
    <div className="h-screen bg-[rgba(206,228,213,0.3)] sm:flex">
      <div className="sm:flex sm:h-full">
        <Header />
      </div>
      <div className="h-full max-w-[70%] mx-auto min-w-[300px] sm:max-w-[50%] sm:min-w-[400px] bg-[#E8F3F1] overflow-auto">
        <h1 className="text-4xl">Hi, {user.name}</h1>
        <p>Number of Allergies:{user.allergies.length}</p>
        <p>Conditions:</p>
        <ul>
          {user.medical_conditions.map((condition) => (
            <li>{condition.condition}</li>
          ))}
        </ul>
        <p>Number of Record Entries:{user.records.length}</p>
      </div>
    </div>
  );
};

export default MainPage;
