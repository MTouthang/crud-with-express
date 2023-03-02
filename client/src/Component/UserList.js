import React from "react";

const UserList = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <tbody className="m-2">
              <tr className="bg-gray-100 border hover:bg-gray-200  border-solid border-slate-50  ">
                <td className="px-4 py-3">John</td>
                <td className="px-4 py-3">john@gmail.com</td>
                <td className="px-4 py-3 text-lg text-gray-900 hover:text-indigo-600 hover:cursor-pointer">
                  Edit
                </td>
                <td className="px-4 py-3 text-lg text-gray-900 hover:text-indigo-600  hover:cursor-pointer">
                  Remove
                </td>
              </tr>
              <tr className="bg-gray-100 rounded-md border border-slate-300 hover:bg-gray-200 border-solid border-slate-50">
                <td className="px-4 py-3">John</td>
                <td className="px-4 py-3">john@gmail.com</td>
                <td className="px-4 py-3 text-lg text-gray-900 hover:text-indigo-600  hover:cursor-pointer">
                  Edit
                </td>
                <td className="px-4 py-3 text-lg text-gray-900 hover:text-indigo-600  hover:cursor-pointer">
                  Remove
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default UserList;
