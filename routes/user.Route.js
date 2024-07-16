import express from "express";
import {
  createUser,
  deleteUser,
  getSingleUser,
  getUser,
  updateUser,
  getUpdate,
  search,
} from "../controller/user.Controller.js";
import jsonVerify from "../middleware/isLoggedIn.js";
const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.get("/get", jsonVerify ,  getUser);
userRouter.get("/single/:id", jsonVerify, getSingleUser);
userRouter.get("/update/:id", jsonVerify, getUpdate);
userRouter.post("/update/:id", jsonVerify, updateUser);
userRouter.get("/:id", jsonVerify, deleteUser);
userRouter.get("/search/:id",  search);

// userRouter.get('/search/:id', async (req,res) =>{
//   const user = await userModel.find({
//     "$or":[
//       {
//         "name" : { $regex : req.params.id }
//       }
//     ]
//   })

// })

export default userRouter;
