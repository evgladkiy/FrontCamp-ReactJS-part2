import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';

import Tweet from './tweet/tweet';

const TweetsList = props => (
    props.tweets.map(item => (
        <Tweet key={item.get('_id')} tweetInfo={item} />
    ))
);

TweetsList.propTypes = {
    tweets: PropTypes.instanceOf(Immutable.List).isRequired,
};

export default TweetsList;
