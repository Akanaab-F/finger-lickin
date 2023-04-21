import React from "react";

const FooterHeader: React.FC<{ text: string }> = ({ text }) => {
  return (
    <h3 className="text-white capitalize font-mediumFont text-2xl">{text}</h3>
  );
};

export default FooterHeader;
