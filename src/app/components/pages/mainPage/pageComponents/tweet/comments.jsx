import React, { PureComponent } from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';

import { getCurrentDate } from './tweetHelpers';
import CommentList from './commentList';

class Comments extends PureComponent {
    constructor() {
        super();
        this.formSubmitHandler = this.formSubmitHandler.bind(this);
        this.toggleAllComments = this.toggleAllComments.bind(this);
        this.commentFilter = this.commentFilter.bind(this);
        this.state = {
            shouldAllComments: false,
        };
    }

    toggleAllComments() {
        this.setState(prevState => (
            Object.assign({}, prevState, {
                shouldAllComments: !prevState.shouldAllComments,
            })
        ));
    }

    commentFilter(comments) {
        if (comments.size <= 0 || this.state.shouldAllComments) {
            return comments;
        }

        return comments.slice(-3);
    }

    formSubmitHandler(e) {
        const text = this.textarea.value.trim();
        const { userInfo, addComment, tweetId } = this.props;

        e.preventDefault();

        if (text !== '') {
            const newComment = {
                tweetId,
                comment: {
                    commentAuthor: userInfo.get('userName'),
                    email: userInfo.get('email'),
                    commentText: text,
                    commentDate: getCurrentDate(),
                    avatar: userInfo.get('avatar'),
                },
            };

            this.textarea.value = '';
            addComment(newComment);
        }
    }

    render() {
        const { userInfo, comments, tweetId } = this.props;

        return (
            <div className="comments-container">
                <div className="btn-container">
                    { comments.size > 3 ?
                        <button type="button" className="btn comments-btn" onClick={this.toggleAllComments}>
                            {this.state.shouldAllComments ? 'Hide' : 'Show'} all comments
                        </button> :
                        ''
                    }
                </div>
                <CommentList comments={this.commentFilter(comments)} />
                <form className="comment-form" onSubmit={this.formSubmitHandler}>
                    <img
                      className="comment-author__img"
                      src={userInfo.get('avatar')}
                      alt={`${userInfo.get('userName')} avatar`}
                    />
                    <textarea
                      id={`commentTextarea-${tweetId}`}
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

Comments.propTypes = {
    comments: PropTypes.instanceOf(Immutable.List).isRequired,
    userInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
    addComment: PropTypes.func.isRequired,
    tweetId: PropTypes.string.isRequired,
};

export default Comments;
