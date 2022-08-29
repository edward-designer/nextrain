import React from "react";

type TButton = {
  clickHandler: () => void;
  children: React.ReactNode;
  customStyle?: string;
};

const Button = ({ clickHandler, children, customStyle }: TButton) => {
  return (
    <button
      className={`bg-blue-900 w-8 h-8 rounded-full text-white m-1 ${customStyle}`}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};

export default Button;
