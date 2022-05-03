import React from "react";
import Header from "../components/Header";
import RecordEntry from "../components/RecordEntry";
import RecordCard from "../components/RecordCard";

import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";

const Records = () => {
  const user = useSelector(selectUser);

  return (
    <div className="h-screen bg-[rgba(206,228,213,0.3)] sm:flex">
      <div className="sm:flex sm:h-full">
        <Header />
      </div>
      <div className="h-full max-w-[70%] mx-auto min-w-[300px] sm:max-w-[50%] sm:min-w-[400px] bg-[#E8F3F1] overflow-auto">
        <h1>New Record:</h1>
        <RecordEntry />
        {user.records
          .map((record, index) => (
            <RecordCard
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
  );
};

export default Records;
