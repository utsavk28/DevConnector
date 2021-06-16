import axios from 'axios';
import { setAlert } from './alert';
import {
    ADD_COMMENT,
    ADD_POST,
    DELETE_POST,
    GET_POST,
    GET_POSTS,
    POST_ERROR,
    REMOVE_COMMENT,
    UPDATE_LIKES,
} from './type';

// Get Posts
export const getPosts = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        });
    }
};

// Get Post
export const getPost = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/posts/${id}`);
        dispatch({
            type: GET_POST,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        });
    }
};

// Add Like
export const addLike = (postId) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/posts/like/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {
                id: postId,
                likes: res.data,
            },
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        });
    }
};

// Remove Like
export const removeLike = (postId) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {
                id: postId,
                likes: res.data,
            },
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        });
    }
};

// Delete Post
export const deletePost = (postId) => async (dispatch) => {
    try {
        await axios.delete(`/api/posts/${postId}`);

        dispatch({
            type: DELETE_POST,
            payload: postId,
        });

        dispatch(setAlert('Post Removed', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        });
    }
};

// Add Post
export const addPost = (formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await axios.post(`/api/posts`, formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data,
        });

        dispatch(setAlert('Post Created', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        });
    }
};

// Add Comment
export const addComment = (postId, formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await axios.post(
            `/api/posts/comment/${postId}`,
            formData,
            config
        );

        dispatch({
            type: ADD_COMMENT,
            payload: res.data,
        });

        dispatch(setAlert('Comment Added', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        });
    }
};

// Delete Comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
    try {
        await axios.delete(
            `/api/posts/comment/${postId}/${commentId}`
        );

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId,
        });

        dispatch(setAlert('Comment Removed', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        });
    }
};
