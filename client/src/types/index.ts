export interface User {
    _id: string;
    username: string;
    email: string;
    createdAt: string;
}

export interface Comment {
    _id: string;
    content: string;
    author: User;
    post: string;
    createdAt: string;
}

export interface Post {
    _id: string;
    title: string;
    content: string;
    author: User;
    coverImage?: string;
    comments: Comment[];
    likes: string[];
    createdAt: string;
    updatedAt: string;
}

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

export interface PostState {
    posts: Post[];
    currentPost: Post | null;
    loading: boolean;
    error: string | null;
} 