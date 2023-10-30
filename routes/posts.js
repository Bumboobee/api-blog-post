const express = require("express")
const res = require("express/lib/response")
const router = express.Router();

const Post = require("./../model/post")

router.get("/", (req, res) => {
    
});

router.get("/id", (req, res) => {
    res.send('Single post')
});

router.post("/", async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })

    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

module.exports = router;
