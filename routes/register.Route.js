import express from "express";
import {
  getAdmin,
  getLogin,
  getRegister,
  logout,
  registerCreate,
  registerLogin,
} from "../controller/register.Controller.js";
import jsonVerify from "../middleware/isLoggedIn.js";
const registerRouter = express.Router();

registerRouter.get("/create", getRegister);
registerRouter.get("/login", getLogin);
registerRouter.post("/create", registerCreate);
registerRouter.post("/login", registerLogin);
registerRouter.get("/admin", jsonVerify , getAdmin);
registerRouter.get("/logout", logout);

export default registerRouter;
