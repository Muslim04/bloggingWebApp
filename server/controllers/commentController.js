const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Add a comment to a post
exports.addComment = async (req, res) => {
    try {
        const { content } = req.body;
        const postId = req.params.postId;
        const userId = req.user._id;

        const comment = new Comment({
            content,
            author: userId,
            post: postId
        });

        await comment.save();

        // Add comment to post's comments array
        await Post.findByIdAndUpdate(postId, {
            $push: { comments: comment._id }
        });

        // Populate author details
        await comment.populate('author', 'username');

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment', error: error.message });
    }
};

// Get comments for a post
exports.getComments = async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await Comment.find({ post: postId })
            .populate('author', 'username')
            .sort({ createdAt: -1 });

        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error: error.message });
    }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if user is the author of the comment
        if (comment.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this comment' });
        }

        // Remove comment from post's comments array
        await Post.findByIdAndUpdate(comment.post, {
            $pull: { comments: commentId }
        });

        await comment.remove();

        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error: error.message });
    }
}; 