import React from "react";

type PropsType = {
  error: string | null;
};

const Error = ({ error }: PropsType) => {
  if (!error) return null;
  return <div role="alert">{error}</div>;
};

export default Error;
