import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import Spinner from './../../../common/spinner';
import TweetsList from './tweetsList';
import TweetsToolbox from './tweetsToolbox';
import NewTweetForm from './newTweetFrom';

import { fetchTweetsAction } from './../../../../actions/tweetsActions';

class MainPageBody extends Component {
    static fetchData(dispatch) {
        return dispatch(fetchTweetsAction());
    }

    constructor() {
        super();
        this.tweetFilter = this.tweetFilter.bind(this);
    }

    componentWillMount() {
        this.props.fetchTweets();
    }

    tweetFilter(tweets) {
        return tweets.filter((tweet) => {
            const filter = this.props.filter
                .trim()
                .toLowerCase();

            return tweet.get('tweetAuthor')
                .split(' ')
                .some(word => word.toLowerCase().indexOf(filter) === 0);
        });
    }

    render() {
        const { tweets } = this.props;

        return (
            <React.Fragment>
                { tweets.size === 0 ?
                    <Spinner /> :
                    <main>
                        <TweetsToolbox />
                        <NewTweetForm />
                        <TweetsList tweets={this.tweetFilter(tweets)} />
                    </main>
                }
            </React.Fragment>
        );
    }
}

MainPageBody.propTypes = {
    tweets: PropTypes.instanceOf(Immutable.List).isRequired,
    filter: PropTypes.string.isRequired,
    fetchTweets: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        tweets: state.tweets,
        filter: state.toolbox.get('filter'),
    };
}

function mapActionsToProps(dispatch) {
    return {
        fetchTweets() {
            dispatch(fetchTweetsAction());
        },
    };
}

export default connect(mapStateToProps, mapActionsToProps)(MainPageBody);
