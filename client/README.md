# CRUD with Express (Frontend)


### Project Setup

**Create a react app using `npx create-react-app client`** and install `axios`   
**folder structure**
```bash
-client
    -node_modules
    -public
        -index.html
    -src
        -component
            -UserForm.js
            -UserList.js
    -App.js
    -Index.js
    -Index.css
    -.gitignore
    -package-lock.json
    -package.json
    -README.md
    -tailwindcss.js
```
## Install and config tailwindcss
Install it using `npm install -D tailwindcss` and run `npx tailwind init` then configure the path inside the `tailwind.config.js` file

`tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

```

Adding tailwind directive to the CSS file   
`index.css`  
```javaScript
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

```

## Proxy setup
Add `"proxy": "http://localhost:8081/api/v1"` any where inside the `package.json` file.

## Adding UserForm and UserList template components.

`UserForm.js`
```javaScript
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

```

`UserList.js`
```javascript
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
```

`UserList.js`
```javascript
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
```

## Fetch user profiles
Create a state to store the created or the fetch user data from the database inside `App.js` component and pass the state as props to the `ListUser`component.
`useState` is used to fetch the user data by passing the `fetchUserProfile` function inside the `useState`. The load state is use to check if the data is loading or not.
```javascript
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
```

Passing as props to `UserList.js`     
```javascript
<UserList user={userData} setUserData={setUserData} />
```

Inside the `UserList.js` the user data is map and display in a tabular manner.


## Create User Profile
With two react state to store use input inside the `UserForm.js` with Add User button

```javascript
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

// add user button function
```
```html
  <button
            className="block text-center mx-auto w-full text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={handleAddUser}
          >
            Add User
          </button>
```
## Updating User profile
With two state for name and email inside the `ListUser.js` create a `updateUserProfile` function to update the existing user with `contenteditable` provided within the HTML element.

```javascript
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
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
```
update user button
```html

<span
    className="mx-5"
    onClick={() => updateUserProfile(userItem._id)}
    >
    Update
    </span>
```

## Delete user profile
Create a delete function `handleDelete` and passing id as parameter inside the `ListUser.js` component.

```javascript
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
```
Delete user button
```html
<td
className="px-4 py-3 text-lg text-gray-900 hover:text-indigo-600  hover:cursor-pointer"
onClick={() => handleDelete(userItem._id)}
>
Remove
</td>
```   
The Client can perform CRUD operation successfully in the Frontend too.