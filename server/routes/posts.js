const express = require('express');

const posts = require('../controllers/posts.js');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', posts.getPosts);
router.post('/', auth, posts.createPost);
router.patch('/:id', auth, posts.updatePost);
router.delete('/:id', auth, posts.deletePost);
router.patch('/:id/likePost', auth, posts.postLike)

module.exports = router;