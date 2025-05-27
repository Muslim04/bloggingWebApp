import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import type { Post } from '../types';

interface PostCardProps {
  post: Post;
  onLike?: () => void;
}

const PostCard = ({ post, onLike }: PostCardProps) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(post.likes.includes(user?._id || ''));
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (!user) return;
    
    try {
      setIsLiking(true);
      const response = await axios.put(
        `http://localhost:5000/api/posts/${post._id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      
      setIsLiked(!isLiked);
      setLikeCount(response.data.likes.length);
      if (onLike) onLike();
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <Link to={`/post/${post._id}`} className="block">
          <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors duration-300">
            {post.title}
          </h2>
        </Link>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>By {post.author.username}</span>
          <span className="mx-2">•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <p className="text-gray-700 line-clamp-3">
          {post.content}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to={`/post/${post._id}`}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Read more →
            </Link>
            {user && (
              <button
                onClick={handleLike}
                disabled={isLiking}
                className={`flex items-center space-x-1 ${
                  isLiked ? 'text-red-500' : 'text-gray-500'
                } hover:text-red-500 transition-colors duration-200`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill={isLiked ? 'currentColor' : 'none'}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>{likeCount}</span>
              </button>
            )}
          </div>
          <span className="text-sm text-gray-500">
            {post.comments?.length || 0} comments
          </span>
        </div>
      </div>
    </article>
  );
};

export default PostCard; 