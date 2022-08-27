import React from "react";

type TButton = {
  clickHandler: () => void;
  children: React.ReactNode;
};

const Button = ({ clickHandler, children }: TButton) => {
  return <button onClick={clickHandler}>{children}</button>;
};

export default Button;
