import React, { PureComponent } from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Commentlist from './commentList';
import TweetFooter from './tweetFooter';
import { getTweetDate, getNickName, getTweetText } from './tweetHelpers';
import { updateTweetAction, deleteTweetAction } from './../../../../../actions/tweetsActions';

class Tweet extends PureComponent {
    render() {
        const {
            tweetInfo,
            deleteTweet,
            updateTweet,
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
                <Commentlist
                  comments={tweetInfo.get('comments')}
                  userInfo={user.get('userInfo')}
                />
            </section>
        );
    }
}

Tweet.propTypes = {
    tweetInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
    user: PropTypes.instanceOf(Immutable.Map).isRequired,
    deleteTweet: PropTypes.func.isRequired,
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
    };
}

export default connect(mapStateToProps, mapActionsToProps)(Tweet);
