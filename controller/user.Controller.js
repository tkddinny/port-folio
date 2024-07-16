import userModel from "../model/user.Model.js";

const createUser = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const userCreate = new userModel({ name, email, subject, message });
    if (userCreate) {
      await userCreate.save();
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).redirect("/");
  } catch (error) {
    res.status(500).json({ error: "controller create user Err:" });
  }
};

//get all user
const getUser = async (req, res) => {
  try {
    const getAllUser = await userModel.find();
    if (getAllUser) {
      return res.status(200).render('read', {getAllUser});
    }
  } catch (error) {
    res.status(500).json({ error: "controller get all user Err:" });
  }
};

//get single user
const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const singleUser = await userModel.findById(id);
    if (singleUser) {
      return res.status(200).render("singleUser", { singleUser });
    }
  } catch (error) {
    res.status(500).json({ error: "controller get Single user Err:" });
  }
};

//serch api
const search = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.find({
      $or: [{ "name": { $regex: id } }],
    });
    if (user) {
      return res.status(200).json({mes:"user is" , user});
    }
  } catch (error) {
    res.status(500).json({ error: "search api user Err:" });
  }
};

//get update ejs file
const getUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = await userModel.findById(id);
    if (updateUser) {
      return res.render("edit", { updateUser });
    }
  } catch (error) {
    res.status(500).json({ error: "controller get update user Err:" });
  }
};

//update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, subject, message } = req.body;
    const updateUser = await userModel.findByIdAndUpdate(id, {
      name,
      email,
      subject,
      message,
    });
    if (updateUser) {
      return res.status(200).redirect("/user/get");
    }
  } catch (error) {
    res.status(500).json({ error: "controller update user Err:" });
  }
};
//delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await userModel.findByIdAndDelete(id);
    if (deleteUser) {
      return res.status(200).redirect("/user/get");
    }
  } catch (error) {
    res.status(500).json({ error: "controller delete user Err:" });
  }
};


export {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
  getUpdate,
  search,
  // jsonVerify,
};
