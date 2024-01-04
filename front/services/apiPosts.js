import axios from 'axios';

const BASE_URL = 'http://192.168.1.17:3000';
// const BASE_URL = 'http://172.20.10.9:3000';

export const getPostsByEventId = async (eventId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/postRoute/posts/${eventId}`);
        if (response.data) {
            return response.data;
        } else {
            console.error('Error in data getPostsByEventId:', response.data);
        }
    } catch (error) {
        console.error('Error in getPostsByEventIds:', error);
    }
};

export const getCommentsByPostId = async (postId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/postRoute/comments/${postId}`);
        if (response.data) {
            return response.data;
        } else {
            console.error('Error in data getCommentsByPostId:', response.data);
        }
    } catch (error) {
        console.error('Error in getCommentsByPostId:', error);
    }
};

export const addComment = async (post_id, user_id, text, image) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/postRoute/comments/add`,
            {
                postId: post_id,
                userId: user_id,
                text: text,
                image: image,
            }
        );
        if (response.data) {
            return response.data;
        } else {
            console.error('Error in data addComment:', response.data);
        }
    } catch (error) {
        console.error('Error in addComment:', error);
    }
};

export const addPost = async (event_id, user_id, text, image) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/postRoute/posts/add`,
            {
                eventId: event_id,
                userId: user_id,
                text: text,
                image: image,
            }
        );
        if (response.data) {
            return response.data;
        } else {
            console.error('Error in data addComment:', response.data);
        }
    } catch (error) {
        console.error('Error in addComment:', error);
    }
};

export const deleteComment = async (commentId) => {
    try {
        const response = await axios.delete(
            `${BASE_URL}/postRoute/comments/delete/${commentId}`
        );
        if (response.data) {
            return response.data;
        } else {
            console.error('Error in data deleteComment:', response.data);
        }
    } catch (error) {
        console.error('Error in deleteComment:', error);
    }
};

export const deletePost = async (postId) => {
    try {
        const response = await axios.delete(
            `${BASE_URL}/postRoute/posts/delete/${postId}`
        );
        if (response.data) {
            return response.data;
        } else {
            console.error('Error in data deletePost:', response.data);
        }
    } catch (error) {
        console.error('Error in deleteComment:', error);
    }
};