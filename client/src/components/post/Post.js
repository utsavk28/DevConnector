import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem'
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../../actions/post';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ match }) => {
    const dispatch = useDispatch();
    const { post, loading } = useSelector((state) => state.post);

    useEffect(() => {
        dispatch(getPost(match.params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return loading || post === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <Link to='/posts' className='btn'>
                Back To Posts
            </Link>
            hi
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id} />
            <div className='comments'>
                {post.comments.map((comment) => (
                    <CommentItem
                        key={comment._id}
                        comment={comment}
                        postId={post._id}
                    />
                ))}
            </div>
        </Fragment>
    );
};

export default Post;
