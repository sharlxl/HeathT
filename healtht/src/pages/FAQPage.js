import React, { useEffect } from "react";
import Header from "../components/Header";
import FAQAccordion from "../components/FAQAccordion";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const FAQPage = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      alert("Please log in");
      navigate("/");
    }
  }, []);

  return (
    <>
      {!user ? (
        <p>Please log in</p>
      ) : (
        <div className="h-screen bg-[rgba(206,228,213,0.3)]">
          <div className="sm:flex sm:h-full">
            <Header />
            <div className="w-[20rem] sm:w-[30rem] mx-auto sm:ml-[2rem]">
              <FAQAccordion />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FAQPage;
