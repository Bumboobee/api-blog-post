const express = require("express")
const res = require("express/lib/response")
const router = express.Router();

const Post = require("./../model/post")

router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.get("/:postId", async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.get("offsset/:offset/limit/:limit", async (req, res) => {
    try {
        Number. isInteger(req.params.offset) && Number.isInteger(req.params.limit) || res.status(400).json({ message: "offset and limit must be integers" });

        const posts = await Post.find().skip(parseInt(req.params.offset)).limit(parseInt(req.params.limit));
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: err });
    }
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

router.patch("/:postId", async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({ 
            _id: req.params.postId 
            },
            { $set: { 
                title: req.body.title, 
                description: req.body.title 
            }}
        );
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.delete("/:postId", async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.postId });
        res.status(200).json(removedPost);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

module.exports = router;
