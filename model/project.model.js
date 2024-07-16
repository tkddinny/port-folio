import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    descripation: {
      type: String,
      required: true,
    },
    url:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);
const projectModel = mongoose.model("project", projectSchema);
export default projectModel;
