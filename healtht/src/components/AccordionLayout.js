import React from "react";

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
          {activeIndex === index ? (
            <p>-</p>
          ) : (
            <svg
              className="fill-current text-black h-6 w-6 transform transition-transform duration-500"
              viewBox="0 0 20 20"
            >
              <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
            </svg>
          )}
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
