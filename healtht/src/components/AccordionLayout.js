import React from "react";
import LeftIcon from "../svg/LeftIcon";
import DownIcon from "../svg/DownIcon";

const AccordionLayout = ({
  title,
  children,
  index,
  activeIndex,
  setActiveIndex,
}) => {
  const onClickSetIndex = (index) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
    } else if (activeIndex === index) {
      setActiveIndex(0);
    }
  };

  return (
    <>
      <div
        onClick={() => onClickSetIndex(index)}
        className="flex w-5/6 justify-between p-2 mt-2 rounded bg-[#28D5BC] shadow-sm shadow-[rgba(52,75,70,0.3)]"
      >
        <div className="flex">
          <div className="text-black font-bold">{title}</div>
        </div>
        <div className="flex items-center justify-center">
          {activeIndex === index ? <DownIcon /> : <LeftIcon />}
        </div>
      </div>
      {activeIndex === index && (
        <div className="w-5/6 border-l-2 border-[#28D5BC] shadow-md rounded-b-md shadow-[rgba(52,75,70,0.3)] p-4 mb-6 text-[#344B46]">
          {children}
        </div>
      )}
    </>
  );
};

export default AccordionLayout;
