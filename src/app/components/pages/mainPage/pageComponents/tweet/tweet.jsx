import React, { PureComponent } from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Comments from './comments';
import TweetFooter from './tweetFooter';
import { getTweetDate, getNickName, getTweetText } from './tweetHelpers';
import { updateTweetAction, deleteTweetAction, addCommentAction } from './../../../../../actions/tweetsActions';

class Tweet extends PureComponent {
    render() {
        const {
            tweetInfo,
            deleteTweet,
            updateTweet,
            addComment,
            user,
        } = this.props;

        return (
            <section className="tweet">
                <div className="tweet-header">
                    <img src={tweetInfo.get('avatar')} alt="author avatar" />
                    <div className="author-container">
                        <a href="#" className="author-name">{tweetInfo.get('tweetAuthor')} </a>
                        <div className="author-nikName">
                            {getNickName(tweetInfo.get('email'))}
                        </div>
                    </div>
                    <span className="tweet-date">
                        {getTweetDate(tweetInfo.get('tweetDate'))}
                    </span>
                </div>
                <p className="tweetText">
                    {getTweetText(tweetInfo.get('tweetText'))}
                </p>
                <TweetFooter
                  likes={tweetInfo.get('likes')}
                  retweets={tweetInfo.get('retweets')}
                  comments={tweetInfo.get('comments')}
                  id={tweetInfo.get('_id')}
                  deleteTweet={deleteTweet}
                  updateTweet={updateTweet}
                  userInfo={user.get('userInfo')}
                />
                <Comments
                  comments={tweetInfo.get('comments')}
                  userInfo={user.get('userInfo')}
                  addComment={addComment}
                  tweetId={tweetInfo.get('_id')}
                />
            </section>
        );
    }
}

Tweet.propTypes = {
    tweetInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
    user: PropTypes.instanceOf(Immutable.Map).isRequired,
    deleteTweet: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    updateTweet: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

function mapActionsToProps(dispatch) {
    return {
        deleteTweet(id) {
            dispatch(deleteTweetAction(id));
        },

        updateTweet(tweetData) {
            dispatch(updateTweetAction(tweetData));
        },

        addComment(comment) {
            dispatch(addCommentAction(comment));
        },
    };
}

export default connect(mapStateToProps, mapActionsToProps)(Tweet);
