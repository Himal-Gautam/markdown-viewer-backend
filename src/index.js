import express from 'express'
import './db/mongoose.js'
import userRouter from './routers/user.js'
import taskRouter from './routers/task.js'
import cors from 'cors'
import chalk from "chalk";

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.get("/", (req, res) => {
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
  