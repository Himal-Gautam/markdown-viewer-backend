import express from "express";
import User from "../models/user.js";
import auth from "../middleware/auth.js";
import { request } from "express";
const router = new express.Router();
import { Auth } from "two-step-auth";

const success = true;

//creates new user
router.post("/users/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    console.log(req.body);
    console.log(user);
    await user.save();
    console.log("user saved");
    const token = await user.generateAuthToken();
    console.log({ user, token });
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// loggin
router.post("/users/login", async (req, res) => {
  console.log("request recieved");
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    console.log("user found");
    const token = await user.generateAuthToken();
    console.log("token created");
    res.send({ user, token });
    console.log("data sent");
  } catch (e) {
    res.status(401).send();
  }
});

//user logout
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/users/me', auth, async (req, res) => {
    res.status(202).send(req.user)
})

export default router;
