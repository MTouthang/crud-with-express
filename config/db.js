import mongoose from "mongoose";

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
