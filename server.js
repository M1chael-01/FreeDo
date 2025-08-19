const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const sessionMiddleware = require("./Config/session"); 
const AuthRouther = require("./Routers/AuthRouter");
const TaskRouther = require("./Routers/TasksRouter");

require("dotenv").config();


app.use(express.json());

app.use(helmet());

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    credentials: true,
}));

app.use(sessionMiddleware);


app.use("/Auth" , AuthRouther);
app.use("/Tasks" , TaskRouther);


app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});
