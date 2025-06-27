import mongoose from "mongoose";

// ConnectionObject is used to track the connection state
// isConnected is a number that represents the connection state
type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

// its not like c++ void in ts void means i don't care about the return type
async function dbConnect(): Promise<void> {
  // edge runtime in nextjs
  if (connection.isConnected) {
    console.log("Already Connected to Database");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to Database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
}

export default dbConnect;
