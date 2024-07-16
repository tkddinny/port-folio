import registerModel from "../model/register.Model.js";
import bcrypt from "bcrypt";
import generateToken from "../generateToken/generateToken.js";

const getRegister = (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    res.status(500).json({ error: "get register user ERR:" });
  }
};

// create user data
const registerCreate = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await registerModel.findOne({ email: email });
    if (user) {
      res.status(404).json({ message: "user all ready axist" });
    } else if (username === "") {
      res
        .status(404)
        .json({ massage: "username is empty please fill the username" });
    } else if (email === "") {
      res.status(404).json({ massage: "email is empty please fill the email" });
    } else if (password === "") {
      res
        .status(404)
        .json({ massage: "password is empty please fill the password" });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          const user = await registerModel.create({
            username,
            email,
            password: hash,
          });
          const token = generateToken(user);
          res.cookie("token", token);
          // console.log(token);
          res.status(200).redirect("login");
        });
      });
    }
  } catch (error) {
    res.status(500).json({ error: "registerCreate err:" });
  }
};

//getLogin

const getLogin = (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    res.status(500).json({ error: "get login err:" });
  }
};

//login user create
const registerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await registerModel.findOne({ email: email });
    if (!user) {
      res.status(404).json({ message: "email incorrect" });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = generateToken(user);
          res.cookie("token", token).status(200).redirect("admin");
        } else {
          res.status(404).json({ message: "password incorrect" });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: "getLogin err:" });
  }
};

//logout router
const logout = (req, res) => {
  try {
    res.clearCookie("token").redirect("create");
  } catch (error) {
    res.status(500).json({ error: "logout user ERR:" });
  }
};

//get admin
const getAdmin = (req, res) => {
  try {
    res.render("admin");
  } catch (error) {
    res.status(500).json({ error: "get admin ERR:" });
  }
};

export {
  getRegister,
  registerCreate,
  registerLogin,
  getLogin,
  getAdmin,
  logout,
};
