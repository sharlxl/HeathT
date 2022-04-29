import React from "react";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
import MUIButton from "@mui/material/Button";
// import SendIcon from "@mui/icons-material/Send";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#28D5BC",
//     },
//   },
// });

const Button = (props) => {
  return (
    <button
      type={props.type}
      className="relative inline-flex items-center justify-start px-5 py-1 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
    >
      <span class="w-48 h-48 rounded rotate-[-40deg] bg-[#28D5BC] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
      <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-black">
        {props.placeholder}
      </span>
    </button>
  );
};

export default Button;
