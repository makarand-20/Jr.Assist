import React, { useState, useRef } from 'react';
import "react-toastify/dist/ReactToastify.css";

const SearchBar = ({onSearch}) => {
  const [searchValue, setSearchValue] = useState('');
  const searchRef = useRef(null);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchValue);
  };

  return (
    <div className="relative mb-10" ref={searchRef}>
      <form className="flex items-center" onSubmit={handleSubmit}>
        <div className={`relative transition-all duration-300 w-80`}>
          <div className="relative flex items-center">
            <input
              type="text"
              className="py-2 pl-10 pr-12 rounded-full border border-gray-600 bg-transparent focus:outline-none focus:ring-1 focus:ring-gray-700 w-full"
              placeholder="Search any blog here..."
              value={searchValue}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="absolute right-0 top-0 h-full w-12 flex items-center justify-center">
            <span className="sr-only">Search</span>
            <svg
              className="w-5 h-5 text-gray-900 transform transition-transform duration-300 ease-in-out"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path
                className="transform transition-transform duration-300 ease-in-out"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.707 12.293l3.999 3.999a1 1 0 11-1.414 1.414l-3.999-3.999a7 7 0 111.414-1.414zM8 14a6 6 0 100-12 6 6 0 000 12z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
