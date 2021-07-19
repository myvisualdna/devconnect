import React from 'react';
import PropTypes from 'prop-types';
import PostItem from './postItem';

function PostFeed(props) {
    const {posts} = props;

    return posts.map(post => <PostItem key={post._id} post={post} />);
}

export default PostFeed
