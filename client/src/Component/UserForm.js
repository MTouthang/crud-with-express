import React from "react";

const UserForm = () => {
  return (
    <div className="lg:w-1/2 md:w-2/3 mx-auto">
      <div className="flex flex-wrap">
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="p-2 w-full">
          <button className="block text-center mx-auto w-full text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
