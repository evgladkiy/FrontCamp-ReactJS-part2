import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';

import Tweet from './tweet';

const TweetsList = props => (
    props.tweets.map(tweet => (
        <Tweet
          key={tweet.get('_id')}
          tweetInfo={tweet}
          deleteTweet={props.deleteTweet}
          updateTweet={props.updateTweet}
          userName={props.userName}
        />
    ))
);

TweetsList.propTypes = {
    tweets: PropTypes.instanceOf(Immutable.List).isRequired,
    deleteTweet: PropTypes.func.isRequired,
    updateTweet: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired,
};

export default TweetsList;
