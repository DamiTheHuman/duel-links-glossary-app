import React from "react";
import magicianCircle from "../assets/images/magician-circle.png";
const MainHeader = () => {
  return (
    <nav className="main-header sticky top-0 bg-red-500 shadow-lg text-white shadow-md min-w-full">
      <div className="container mx-auto py-2">
        <img
          className="header-logo mx-auto"
          src={magicianCircle}
          alt="main-header"
        />
      </div>
    </nav>
  );
};
export default MainHeader;
