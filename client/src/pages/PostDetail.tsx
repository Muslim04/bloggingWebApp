import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface Comment {
  _id: string;
  content: string;
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
  comments: Comment[];
}

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setError('Post ID is missing');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        console.log('Post data:', response.data); // Debug log
        setPost(response.data);
      } catch (err: any) {
        console.error('Error fetching post:', err);
        setError(err.response?.data?.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setCommentError('You must be logged in to comment');
      return;
    }

    if (!comment.trim()) {
      setCommentError('Comment cannot be empty');
      return;
    }

    try {
      setSubmitting(true);
      setCommentError(null);
      const response = await axios.post(
        `http://localhost:5000/api/posts/${id}/comments`,
        { content: comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setPost((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          comments: [...prev.comments, response.data],
        };
      });
      setComment('');
    } catch (err: any) {
      console.error('Error submitting comment:', err);
      setCommentError(err.response?.data?.message || 'Failed to submit comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate('/');
    } catch (err: any) {
      console.error('Error deleting post:', err);
      setError(err.response?.data?.message || 'Failed to delete post');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error || 'Post not found'}</p>
          <Link
            to="/"
            className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-purple-600 hover:text-purple-700 bg-purple-50 px-4 py-2 rounded-md"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4 text-purple-800">{post.title}</h1>
        <div className="text-purple-600 mb-4">
          By {post.author.username} on{' '}
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
        <div className="bg-purple-50 p-6 rounded-lg mb-8">
          <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
        </div>

        {user?._id === post.author._id && (
          <div className="flex gap-4 mb-8">
            <Link
              to={`/edit/${post._id}`}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Edit Post
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete Post
            </button>
          </div>
        )}

        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-4 text-purple-800">Comments</h2>
          {user && (
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full p-2 border rounded mb-2 text-gray-700 bg-purple-50"
                rows={3}
                required
                minLength={3}
              />
              {commentError && (
                <p className="text-red-500 mb-2">{commentError}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Comment'}
              </button>
            </form>
          )}

          <div className="space-y-4">
            {post.comments.length === 0 ? (
              <p className="text-gray-600">No comments yet. Be the first to comment!</p>
            ) : (
              post.comments.map((comment) => (
                <div key={comment._id} className="bg-purple-50 p-4 rounded">
                  <div className="text-sm text-purple-600 mb-2">
                    {comment.author.username} on{' '}
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail; 