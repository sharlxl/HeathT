import React from "react";

const Input = (props) => {
  const onChangeInput = (e) => props.setState(e.target.value);

  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      onChange={onChangeInput}
      value={props.state}
      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded max-w-[300px] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#28D5BC] m-[0.5rem] text-center"
    />
  );
};

export default Input;
