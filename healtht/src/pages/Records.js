import React, { useEffect } from "react";
import Header from "../components/Header";
import RecordEntry from "../components/RecordEntry";
import RecordCard from "../components/RecordCard";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Records = () => {
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
        <div className="h-screen bg-[rgba(206,228,213,0.3)] sm:flex">
          <div className="sm:flex sm:h-full">
            <Header />
          </div>
          <div className="text-[#344B46] pt-10 px-5 h-full max-w-[70%] mx-auto min-w-[300px] sm:max-w-[50%] sm:min-w-[400px] bg-[#E8F3F1] overflow-auto">
            <h1 className="text-4xl mb-5">My Records:</h1>
            <RecordEntry />
            {user.records
              .map((record, index) => (
                <RecordCard
                  key={index}
                  index={index}
                  record_id={record.record_id}
                  date={record.date}
                  time={record.time}
                  description={record.description}
                  trigger={record.trigger}
                  pain_score={record.pain_score}
                />
              ))
              .reverse()}
          </div>
        </div>
      )}
    </>
  );
};

export default Records;
