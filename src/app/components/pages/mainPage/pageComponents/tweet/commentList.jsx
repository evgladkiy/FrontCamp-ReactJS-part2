import React, { PureComponent } from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';

import { getTweetDate, getNickName, getTweetText } from './tweetHelpers';

class CommentList extends PureComponent {
    constructor() {
        super();
    }

    render() {
        const { userInfo, comments } = this.props;

        const mappedComments = comments.map(comment => (
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
                                <a className="comment__author" href="#">
                                    {comment.get('commentAuthor')}
                                </a>
                                <p className="comment__nickname">
                                    {getNickName(comment.get('email'))}
                                </p>
                            </div>
                            <span className="comment__date">
                                {getTweetDate(comment.get('commentDate'))}
                            </span>
                        </div>
                        <p className="comment__text">
                            {getTweetText(comment.get('commentText'))}
                        </p>
                    </div>
                </div>
            </li>
        ));

        return (
            <div className="comments-container">
                <ul>
                    {mappedComments}
                </ul>
                <form className="comment-form">
                    <img
                      className="comment-author__img"
                      src={userInfo.get('avatar')}
                      alt={`${userInfo.get('userName')} avatar`}
                    />
                    <textarea
                      id="textarea"
                      className="input comment_textarea"
                      placeholder="Leave a comment..."
                      required
                      ref={(textarea) => { this.textarea = textarea; }}
                    />
                    <button type="submit" className="btn comment_submit">
                        Leave
                        <i className="far fa-comment" />
                    </button>
                </form>
            </div>
        );
    }
}

CommentList.propTypes = {
    comments: PropTypes.instanceOf(Immutable.List).isRequired,
    userInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
};

export default CommentList;
