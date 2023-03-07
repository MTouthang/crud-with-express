import axios from "axios";
import React, { useState } from "react";

const UserForm = ({ setUserData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // create or add user profile function
  const handleAddUser = async () => {
    try {
      // check if whether both field
      if (!name || !email) {
        alert("Both name and email are required!");
      }

      // api calls for creating new user profile
      const res = await axios.post("/users", {
        name: name,
        email: email,
      });

      if (res.status) {
        // setting the user details
        setUserData((prev) => {
          return [...prev, res.data.user];
        });
        alert("User Profiles Added");
      }
    } catch (error) {
      alert(error.response.data.message);
    }

    // clear input field
    setName("");
    setEmail("");
  };

  return (
    <div className="lg:w-1/2 md:w-2/3 mx-auto">
      <div className="flex flex-wrap">
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="p-2 w-full">
          <button
            className="block text-center mx-auto w-full text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={handleAddUser}
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
