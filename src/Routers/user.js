import express from "express";
import User from "../models/user.js";
import auth from "../middleware/auth.js";
import { request } from "express";
const router = new express.Router();

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

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(400).send()
    }
})

export default router;
// module.exports = router
