import React from "react";
import Header from "../components/Header";
import SignUpForm from "../components/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="h-screen bg-[rgba(206,228,213,0.3)]">
      <div className="sm:flex sm:h-full">
        <Header />
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
