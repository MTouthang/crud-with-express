import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user name is required"],
      trim: true,
      minlength: [5, "Name must be at least 5 characters"],
      maxlength: [20, "Name must be less than 20 characters"],
    },
    email: {
      type: String,
      required: [true, "user email is required"],
      // trim: true, // I do not think trim: true is required for email
      unique: true,
      lowercase: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please fill in a valid email address",
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
