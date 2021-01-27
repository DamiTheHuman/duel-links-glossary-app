import React from "react";
import SearchBar from "./SearchBar";
const Main = ({ onSearchSubmit, onRandomSubmit, children }) => {
  return (
    <div className="main w-full">
      {children}
      <SearchBar
        onSearchSubmit={onSearchSubmit}
        onRandomSubmit={onRandomSubmit}
      />
    </div>
  );
};

export default Main;
