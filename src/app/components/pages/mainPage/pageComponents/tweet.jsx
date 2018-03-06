import React, { PureComponent } from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';

import TweetFooter from './tweetFooter';

class Tweet extends PureComponent {
    getTweetDate() {
        const options = {
            day: 'numeric',
            month: 'long',
        };

        return new Date(this.props.tweetInfo.get('tweetDate'))
            .toLocaleString('en-US', options)
            .split(' ')
            .reverse()
            .join(' ');
    }

    getNikName() {
        return this.props.tweetInfo.get('email').split('@')[0];
    }

    getTweetText() {
        const text = this.props.tweetInfo.get('tweetText');
        return `${text[0].toUpperCase()}${text.slice(1)}`;
    }

    render() {
        const { tweetInfo } = this.props;

        return (
            <section className="tweet">
                <div className="tweet-header">
                    <img src={tweetInfo.get('avatar')} alt="author avatar" />
                    <div className="author-container">
                        <div className="author-name">{tweetInfo.get('tweetAuthor')} </div>
                        <div className="author-nikName">@{this.getNikName()} </div>
                    </div>
                    <span className="tweet-date">{this.getTweetDate()} </span>
                </div>
                <p className="tweetText">{this.getTweetText()}</p>
                <TweetFooter
                  likes={tweetInfo.get('likes')}
                  retweets={tweetInfo.get('retweets')}
                  comments={tweetInfo.get('comments')}
                  id={tweetInfo.get('_id')}
                  deleteTweet={this.props.deleteTweet}
                  updateTweet={this.props.updateTweet}
                  userName={this.props.userName}
                />
            </section>
        );
    }
}

Tweet.propTypes = {
    tweetInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
    deleteTweet: PropTypes.func.isRequired,
    updateTweet: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired,
};

export default Tweet;
