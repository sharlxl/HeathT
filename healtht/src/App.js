import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import FAQPage from "./pages/FAQPage";
import Records from "./pages/Records";
import Conditions from "./pages/Conditions";
import Allergies from "./pages/Allergies";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/new" element={<SignUpPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/record" element={<Records />} />
        <Route path="/conditions" element={<Conditions />} />
        <Route path="/allergies" element={<Allergies />} />
      </Routes>
    </>
  );
}

export default App;
