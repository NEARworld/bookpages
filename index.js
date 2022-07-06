require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const userRouter = require('./routers/userRouter');
const bookRouter = require('./routers/bookRouter');

const PORT = process.env.PORT || 7000

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));

app.use("/user", userRouter)
app.use("/books", bookRouter)

async function start() {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT, () => {
            console.log(`Server started on ${PORT} PORT`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()