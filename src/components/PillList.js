import React from "react";

const PillList = ({ pills, onSearchSubmit }) => {
  /** The render format for the list pills to help search functionality */
  const pillItems = pills.map((pill, index) => {
    return (
      <div
        key={index}
        className="image-pill bg-gray-100 text-gray-800 text-sm px-1 py-1 inline-block leading-4 truncate mr-2 mt-2 rounded max-w-lg font-semibold"
      >
        <a
          href="/#"
          onClick={(event) => {
            event.preventDefault();
            onSearchSubmit(pill.value);
          }}
        >
          <img src={pill.Label} alt={pill.value}></img>
        </a>
      </div>
    );
  });
  return (
    <div className="pill-list">
      <div className="flex flex-row mt-2">{pillItems}</div>
    </div>
  );
};

export default PillList;
