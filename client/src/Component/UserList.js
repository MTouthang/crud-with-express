import axios from "axios";
import React, { useState } from "react";

const UserList = ({ user, setUserData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [edit, setEdit] = useState("");

  const [toggle, setToggle] = useState(false);

  // deleteUser
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/users/${id}`);

      if (res.data.success) {
        setUserData((prev) => {
          return prev.filter((userItem) => userItem._id !== id);
        });
        alert("user deleted successfully!");
      }
    } catch (error) {
      alert("user not able to delete");
    }
  };
  // toggle edit button
  const editToggle = (id) => {
    setToggle(toggle ? false : true);
    setEdit((prev) => {
      return prev && id === prev ? "" : id;
    });
  };

  const updateUserProfile = async (id) => {
    setToggle(false);
    try {
      const res = await axios.put(`/users/${id}`, {
        name: name,
        email: email,
      });
      console.log(user.name);
      console.log(user.email);
      // console.log(res.data.message);
      alert(res.data.message);
    } catch (error) {
      // console.log(error.response.data.message);
      alert(error.response.data.message);
      window.location.reload();
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-10  mx-auto">
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <tbody className="m-2">
              {user.map((userItem) => {
                return (
                  <tr
                    key={userItem._id}
                    className="bg-gray-100 border hover:bg-gray-200  border-solid border-slate-50  "
                  >
                    <td
                      className="px-4 py-3"
                      contentEditable={edit === userItem._id ? true : false}
                      suppressContentEditableWarning={true}
                      onInput={(e) => setName(e.target.innerHTML)}
                    >
                      {userItem.name}
                    </td>
                    <td
                      className="px-4 py-3 "
                      contentEditable={edit === userItem._id ? true : false}
                      suppressContentEditableWarning={true}
                      onInput={(e) => setEmail(e.target.innerHTML)}
                    >
                      {userItem.email}
                    </td>
                    <td className="w-[15rem] px-4 py-3 text-lg text-gray-900 hover:text-indigo-600 hover:cursor-pointer">
                      <span onClick={() => editToggle(userItem._id)}>
                        {toggle && edit === userItem._id ? "Cancel" : "Edit"}
                      </span>
                      {toggle && edit === userItem._id && (
                        <span
                          className="mx-5"
                          onClick={() => updateUserProfile(userItem._id)}
                        >
                          Update
                        </span>
                      )}
                    </td>

                    <td
                      className="px-4 py-3 text-lg text-gray-900 hover:text-indigo-600  hover:cursor-pointer"
                      onClick={() => handleDelete(userItem._id)}
                    >
                      Remove
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default UserList;
