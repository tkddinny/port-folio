import express from "express";
import jsonVerify from "../middleware/isLoggedIn.js";
import {
  createProject,
  getProject,
  projectGet,
  upload,
} from "../controller/project.controller.js";

const projectRouter = express.Router();

projectRouter.get('/create', jsonVerify ,projectGet)
projectRouter.post("/create", jsonVerify ,upload.single("image"), createProject);
projectRouter.get("/get", getProject);


export default projectRouter;
