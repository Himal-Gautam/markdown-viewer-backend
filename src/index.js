import express from 'express'
import './db/mongoose.js'
import userRouter from './routers/user.js'
import dataRouter from './routers/data.js'
import cors from 'cors'
import chalk from "chalk";

const app = express()
const port = process.env.PORT

app.use(cors())

app.use(express.json())
app.use(userRouter)
app.use(dataRouter)

app.get("/", (req, res) => {
  console.log('hi');
    res.send("Welcome to Task Manager Server !!!")
})

app.listen(port, () => {
    console.log(
      chalk.magenta.bold.underline("Server is up on port ") +
        chalk.blue.bold.underline(port)
    );
  });
  
  app.get("/", function (request, response) {
    response.send("Welcome to NCSC Project Server");
  });
  