import React from "react";
import UserForm from "./Component/UserForm";
import UserList from "./Component/UserList";

function App() {
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
      <UserForm />
      <UserList />
    </div>
  );
}

export default App;
