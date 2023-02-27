# Backend CRUD demo
A simple CRUD demo application
*****

## Package Required to be installed
**Make sure that node is install in the system**   
1. **nodemon**: is a tool that helps develop Node.js based application automatically restarting the node application when file change in the directory are detected.
1. **express**: is a backend web application framework for building Restful APIs with Nodejs
1. **mongoose**: is a javascript objected-oriented programming library that creates a connection between MongoDB and Nodejs JavaScript runtime environment.
1. **dotenv**: hide and loads environment variables
1. **Morgan**: is a Nodejs and Express middleware to log HTTP requests and Errors, and simplifies the process.

********
### Step by step guide of the projects
##### Create a folder call crud-demo
Inside the crud-demo folder initialize package.json by running the `npm init -y` in the terminal.

i.e    
`PS E:\WORK\crud-demo> npm init -y`

### Install all the required Packages
Run the following script in the terminal to install the required packages   
`npm install dotenv express mongoose morgan`   
Run the script below to install nodemon as development environment  
`npm install -D nodemon`  

**Package.json** file  
Inside the `package.json` file add  
- `"type": "module",` to enable ES6 way of export and import  
- ` "dev": "nodemon index.js", "start": "node index.js"` to start the server in development and production respectively. 

```javascript
{
  "name": "crud-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon index.js",
    "start": "node index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "^2.0.20"
  },
  "dependencies": {
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "mongoose": "^6.10.0",
    "morgan": "^1.10.0"
  }
}

```

### Create Two folders app.js and index.js    
**App.js**  
Firstly import `express`, `dotenv`, and `morgan`. Configure `dotenv` (loads environment variable) and initial express and use middleware `morgan` and `express json` i.e `app.use(express.json())` to handle json data object and `app.use(morgan("tiny"))` to log http request and export the app module.
```javascript
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();
const app = express();

// middleware
app.use(express.json());
app.use(morgan("tiny"));

export default app;
```
**index.js**   
Inside the `index.js` file import the `app.js` file and listen to a particular port (`process.env.PORT` to get the PORT number from `.env`)
```javascript
import app from "./app.js";

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server up and running at Port ${port}`);
});

```
#### create .env file in the root folder
Declare port number where the server will run and local mongodbUrl where the database will be connected.
```md
# server port number
PORT=8081
# database url
MONGODBURL=mongodb://127.0.0.1:27017/crud-demo
``` 

##### Create new folder `config` inside the config folder create a new file `db.js`
**db.js**   
Inside the `db.js` file import `mongoose` and create a function that will connect to the database provided with local mongodbUrl from `.env` i.e `process.env.MONGODBURL` when the function is called, and export the function
```javascript
import mongoose from "mongoose";
// it ensure that only the fields that are specified in the schema will be saved in the  database, and all other fields will not be saved (incase if some other fields are sent)
const connectDatabase = async () => {
  await mongoose
    .set("strictQuery", true) 
    .connect(process.env.MONGODBURL)
    .then((con) =>
      console.log(
        `database connected at ${con.connection.host}:${con.connection.port}`
      )
    )
    .catch((err) => {
      console.log(`database connection fail! ${err.message}`);
      process.exit(1);
    });
};

export default connectDatabase;
```
##### Import `connectDatabase` function in `App.js` and call the function.
**App.js**
```javascript
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDatabase from "./config/db.js";

dotenv.config();
const app = express();

// middleware
app.use(express.json());
app.use(morgan("tiny"));

// db connection
connectDatabase();

export default app;
```

##### Create User Schema
Create a new folder `model` and inside it create a new file `user.models.js` 
Inside the file create a user schema using mongoose.
```javascript
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user name is required"],
      trim: true,
      maxlength: [20, "Name must be less than 20 characters"],
    },
    email: {
      type: String,
      required: [true, "user email is required"],
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", userSchema);
```
##### Set up with the controllers
Create another new folder called `controllers` inside it create a new file `user.controller.js` the file should contain the following function 
- `createProfile`  
For creating profile of the user using POST HTTP request method, name and email are the required field to be provided.
```javascript
export const createProfile = async (req, res) => {
  try {
    // getting user detail from the body
    const { name, email } = req.body;

    // make sure the name and email are present
    if (!name || !email) {
      throw new Error("User name and email should be provided");
    }

    // check if the user is already present
    const userExist = await User.findOne({ email });

    if (userExist) {
      throw new Error("User already exist!");
    }

    // create and save user
    const user = await User.create({
      name,
      email,
    });

    // on success it return success message along with user details
    res.status(200).json({
      success: true,
      message: "user created successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
```
- `fetchProfile`   
It fetch all the available profile in the database using the GET HTTP request method.
```javascript
export const fetchProfile = async (req, res) => {
  try {
    const user = await User.find();
    
    // on success it return success message along with all the users available details.
    if (user) {
      res.status(200).json({
        success: true,
        message: "profile fetch successfully",
        user,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "profile not able to be fetch",
    });
  }
};
```
- `getProfileById`    
It fetch a particular user profile details using the user profile id and HTTP GET request method.
```javascript
export const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("Provide the valid User Id");
    }
    console.log(`id - ${id}`);

    const user = await User.findById(id);

    if (user) {
      res.status(200).json({
        success: true,
        message: "profile fetch successful",
        user,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Profile is not available",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

```
- `deleteProfile`   
It delete a particular user profile using the user profile id and DELETE HTTP request method.
```javascript
export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("Profile id is require!");
    }

    const user = await User.findByIdAndDelete(id);

    if (user) {
      res.status(200).json({
        success: true,
        message: "profile deleted successfully",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "profile is deleted not available",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
``` 
- `updateProfile`   
It update the user profile details using the user profile id and HTTP PUT request method.
```javascript
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("Profile id is required!");
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    if (user) {
      res.status(200).json({
        success: true,
        message: "profile updated successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: true,
      message: "profile not updated",
    });
  }
};
```
##### Set up with Routes
Create a new folder called `routes` inside it create a new file `user.route.js`. Import all the `user.controllers.js` function inside it and declare respectives routes using `express` with `express router`
```javascript
import express from "express";
import {
  createProfile,
  deleteProfile,
  fetchProfile,
  getProfileById,
  home,
  updateProfile,
} from "../controllers/user.controller.js";
const router = express.Router();

router.route("/").get(home);
router.route("/create/profile").post(createProfile);
router.route("/fetch/profile").get(fetchProfile);
router.route("/fetch/profile/:id").get(getProfileById);
router.route("/profile/delete/:id").delete(deleteProfile);
router.route("/profile/update/:id").put(updateProfile);

export default router;
```

##### Routes declaration in `app.js`
Lastly import `routes` in `app.js` and use it.
```javascript
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDatabase from "./config/db.js";

dotenv.config();
const app = express();

// middleware
app.use(express.json());
app.use(morgan("tiny"));

// db connection
connectDatabase();

// import route
import userRoute from "./routes/user.route.js";
app.use("/api/v1", userRoute);

export default app;

```

**Now the backend is ready and can be tested using Postman**