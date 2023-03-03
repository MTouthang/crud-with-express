import React, { useState, useEffect } from "react";
import UserForm from "./Component/UserForm";
import UserList from "./Component/UserList";
import axios from "axios";

function App() {
  // state for storing user data
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  // function for fetching user profile
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/users");
      console.log(res.data.user);
      if (res.data.success) {
        setUserData(res.data.user);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="container py-20 my-24   mx-auto border rounded-md shadow-md">
      <div className="flex flex-col text-center w-full mb-12">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
          CRUD with Express
        </h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
          This is a simple CRUD application demo with Express
        </p>
      </div>
      <UserForm setUserData={setUserData} />
      {loading ? (
        <p className="text-center py-10 mx-auto"> Loading ...</p>
      ) : (
        <UserList user={userData} setUserData={setUserData} />
      )}
    </div>
  );
}

export default App;
