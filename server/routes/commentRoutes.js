const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

// Add a comment to a post
router.post('/posts/:postId/comments', protect, (req, res) => {
    commentController.addComment(req, res);
});

// Get comments for a post
router.get('/posts/:postId/comments', (req, res) => {
    commentController.getComments(req, res);
});

// Delete a comment
router.delete('/comments/:commentId', protect, (req, res) => {
    commentController.deleteComment(req, res);
});

module.exports = router; 