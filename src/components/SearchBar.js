import React, { useState } from "react";
import PillList from "./PillList";
import defaultPillsAPI from "../api/defaultPillsAPI";
import SearchIcon from "../assets/svg/search-icon.svg";
/**
 * Manages the users search requests
 */
const SearchBar = ({ onSearchSubmit, onRandomSubmit }) => {
  /** The current search term the user is searching for */
  const [searchTerm, setSearchTerm] = useState("");
  /**
   * Sends a message to the parent search function for a list of cards
   * @param event the event of the user clicking the button
   */
  const onCardSearchSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit(searchTerm);
  };
  return (
    <div className="search-bar">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2">
          <form onSubmit={onCardSearchSubmit}>
            <div className="search-input bg-white rounded shadow flex bg-gray-100">
              <span className="w-auto flex justify-end items-center text-gray-500 border-r-2 px-2">
                <img
                  className="search-icon"
                  src={SearchIcon}
                  alt="React Logo"
                />
              </span>
              <input
                className="w-full rounded p-1 pl-2 bg-gray-100 focus:outline-none"
                type="text"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
                placeholder="Search..."
              />
            </div>
          </form>
        </div>
        <div>
          <button
            className="bg-red-400 hover:bg-red-300 rounded text-white p-2 w-full bg-red-500"
            onClick={onCardSearchSubmit}
          >
            <p className="font-semibold text-xs">Search</p>
          </button>
        </div>
        <div>
          <button
            className="bg-red-400 hover:bg-red-300 rounded text-white p-2 w-full bg-red-500"
            onClick={onRandomSubmit}
          >
            <p className="font-semibold text-xs">Draw</p>
          </button>
        </div>
      </div>
      <div>
        <PillList pills={defaultPillsAPI} onSearchSubmit={onSearchSubmit} />
      </div>
    </div>
  );
};
export default SearchBar;
