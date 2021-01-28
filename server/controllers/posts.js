const mongoose = require('mongoose');
const PostMessage = require('../models/postMessage');


// fetching all posts from database and send data in response
const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


// creating a new post
const createPost = async (req, res) => {
    const post = req.body;
    
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);
}

const deletePost = async (req, res) => {

    if (!req.userId) {
        return res.status(401).send("You can't delete this post.")
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted Successfully' })
}

const postLike = async (req, res) => {
    const { id } = req.params;

    console.log(req.userId)

    if (!req.userId) return res.json({ message: 'Unauthenticated' });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id)

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        // like the post 
        post.likes.push(req.userId);
    } else {
        // dislike a post
        post.likes.splice(index, 1);
        console.log(post.likes)
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })
    res.json(updatedPost)
}

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    postLike
}