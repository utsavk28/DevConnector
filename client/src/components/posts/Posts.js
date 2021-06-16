import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post';
import PostForm from './PostForm'
import PostItem from './PostItem'

const Posts = () => {
    const dispatch = useDispatch();
    const { posts, loading } = useSelector((state) => state.post);

    useEffect(() => {
        dispatch(getPosts());
    }, []);
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className='large text-primary'>Posts</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Welcome to the community
            </p>
            <PostForm />
            <div className='posts'>
                {posts.map((post) => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
        </Fragment>
    );
};

export default Posts;
