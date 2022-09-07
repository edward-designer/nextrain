import React from "react";

type TButton = {
  clickHandler: () => void;
  children: React.ReactNode;
  customStyle?: string;
  ariaLabel: string;
};

const Button = ({ clickHandler, children, customStyle, ariaLabel }: TButton) => {
  return (
    <button
      className={`bg-button-color w-8 h-8 rounded-full text-reverse-color m-1 ${customStyle}`}
      onClick={clickHandler}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
