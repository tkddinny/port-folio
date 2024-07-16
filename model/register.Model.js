import mongoose from "mongoose";

const registerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const registerModel = mongoose.model("register", registerSchema);
export default registerModel;
