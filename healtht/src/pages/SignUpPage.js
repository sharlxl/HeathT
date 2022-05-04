import React from "react";
import Header from "../components/Header";
import SignUpForm from "../components/SignUpForm";

const SignUpPage = () => {
  return (
    <>
      <div className="h-screen bg-[rgba(206,228,213,0.3)] sm:flex">
        {/* <div className="sm:flex sm:h-full">
          <Header />
        </div> */}
        <div className=" text-[#344B46] h-full max-w-[70%] mx-auto pt-10 px-5 min-w-[300px] sm:max-w-[50%] sm:min-w-[400px] bg-[#E8F3F1] overflow-auto">
          <h1 className="text-2xl mb-5">Sign up for a new account!</h1>
          <SignUpForm />
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
