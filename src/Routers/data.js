import express from 'express'
import Data from '../models/data.js'
import auth from '../middleware/auth.js'
const dataRouter = new express.Router()

dataRouter.post('/data', auth, async (req, res) => {
    const markdown = new Data({
        ...req.body,
        owner: req.user._id
    })
    console.log('markdown');
    try {
        await markdown.save()
        res.status(201).send(markdown)
    } catch (e) {
        res.status(400).send(e)
    }
})

export default dataRouter