const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const dbConnection = require("./config/dbConnection")
const userRouter = require("./Routes/userRouter");
const cookieParser = require("cookie-parser");
const path = require("path");
const blogRouter = require("./Routes/blogRouter");

dbConnection();
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/public")));

// Routes
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server has started on port: ${port} 🚀`);
    }
);