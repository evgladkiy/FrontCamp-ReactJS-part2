import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';

import { getTweetDate, getNickName } from './tweetHelpers';

const CommentList = (props) => {
    const mappedComments = props.comments.map(comment => (
        <li key={comment.get('_id')} className="comment">
            <div className="comment__wrapper">
                <img
                  className="comment-author__img"
                  src={comment.get('avatar')}
                  alt={`${comment.get('commentAuthor')} avatar`}
                />
                <div className="comment__container">
                    <div className="comment__header">
                        <div>
                            <a className="comment__author" href="#">{comment.get('commentAuthor')}</a>
                            <p className="comment__nickname">{getNickName(comment.get('email'))}</p>
                        </div>
                        <span className="comment__date">{getTweetDate(comment.get('commentDate'))}</span>
                    </div>
                    <p className="comment__text">
                        {comment.get('commentText')}
                    </p>
                </div>
            </div>
        </li>
    ));

    return (
        <ul>
            {mappedComments}
        </ul>
    );
};

CommentList.propTypes = {
    comments: PropTypes.instanceOf(Immutable.List).isRequired,
};

export default CommentList;
