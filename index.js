import express from "express";
import { configDotenv } from "dotenv";
import connectDb from "./config/db.Connection.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.Route.js";
import registerRouter from "./routes/register.Route.js";
import projectRouter from "./routes/project.route.js";


const app = express();
connectDb(configDotenv());

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/user", userRouter);
app.use('/register', registerRouter)
app.use('/project', projectRouter)
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(process.env.PORT, () => {
  console.log(`server at http://localhost:${process.env.PORT}`);
});
