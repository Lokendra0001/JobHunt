require('dotenv').config()
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require("cors")
const connectMongoDB = require('./config/mongooseConnection');
const userRouter = require('./routes/user');
const freelancerProjectRouter = require('./routes/freelancerProject');

const app = express();
const PORT = 3000;

connectMongoDB(process.env.MONGODB_URI)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const allowedOrigin = ["http://localhost:5173"];
app.use(cors({
    origin: allowedOrigin,
    credentials: true
}))


app.get("/", (req, res) => {
    res.send("HELLO FROM SERVER!")
})

app.use('/user', userRouter)
app.use('/freelancerProject', freelancerProjectRouter)


app.listen(PORT, () => console.log(`Server Started At ${PORT} `))