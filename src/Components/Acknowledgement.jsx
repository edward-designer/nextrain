import React from "react";

import NRE from "../NRE_Powered_logo.png";

const Acknowledgement = () => {
  return (
    <div className="pt-2 flex flex-row-reverse">
      <img className="max-w-[160px]" src={NRE} alt="powered by NRE" />
    </div>
  );
};

export default Acknowledgement;
