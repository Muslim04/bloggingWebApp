const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    getUserPosts,
    toggleLike
} = require('../controllers/postController');

// Public routes
router.get('/', getPosts);

// Protected routes
router.post('/', protect, createPost);
router.get('/user/:userId', protect, getUserPosts);
router.get('/:id', getPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);
router.put('/:id/like', protect, toggleLike);

module.exports = router; 