import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Redirect } from 'react-router-dom';
import Footer from './../../common/footer';
import Header from './../../common/header';
import Spinner from './../../common/spinner';
import TweetsList from './pageComponents/tweetsList';
import TweetsToolbox from './pageComponents/tweetsToolbox';
import NewTweetForm from './pageComponents/newTweetFrom';

class MainPage extends PureComponent {
    static fetchData(dispatch) {
        return dispatch({ type: 'LOAD_TWEETS' });
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
            const filter = this.props.toolbox
                .get('filter')
                .trim()
                .toLowerCase();

            return tweet.get('tweetAuthor')
                .split(' ')
                .some(word => word.toLowerCase().indexOf(filter) === 0);
        });
    }

    render() {
        const {
            tweets, user, toolbox, deleteTweet, addTweet,
            updateTweet, toggleForm, updateFilter,
        } = this.props;

        const shouldShowForm = toolbox.get('shouldShowForm');

        // if (!user.get('isAuthenticated')) {
        //     return (<Redirect to='login' />);
        // }

        return tweets.size === 0 ?
            <Spinner /> :
            (
                <React.Fragment>
                    <Header />
                    <main>
                        <TweetsToolbox
                          updateFilter={updateFilter}
                          toggleForm={toggleForm}
                          shouldShowForm={shouldShowForm}
                        />
                        <NewTweetForm
                          addTweet={addTweet}
                          user={user.get('userInfo')}
                          toggleForm={toggleForm}
                          shouldShowForm={shouldShowForm}
                        />
                        <TweetsList
                          tweets={this.tweetFilter(tweets)}
                          deleteTweet={deleteTweet}
                          updateTweet={updateTweet}
                          userName={user.get('userInfo').get('userName')}
                        />
                    </main>
                    <Footer year="2018" />
                </React.Fragment>
            );
    }
}

MainPage.propTypes = {
    tweets: PropTypes.instanceOf(Immutable.List).isRequired,
    user: PropTypes.instanceOf(Immutable.Map).isRequired,
    toolbox: PropTypes.instanceOf(Immutable.Map).isRequired,
    deleteTweet: PropTypes.func.isRequired,
    toggleForm: PropTypes.func.isRequired,
    updateFilter: PropTypes.func.isRequired,
    updateTweet: PropTypes.func.isRequired,
    addTweet: PropTypes.func.isRequired,
    fetchTweets: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
    return state;
}

function mapActionsToProps(dispatch) {
    return {
        deleteTweet(payload) {
            dispatch({ type: 'DELETE_TWEET', payload });
        },

        updateTweet(payload) {
            dispatch({ type: 'UPDATE_TWEET', payload });
        },

        addTweet(payload) {
            dispatch({ type: 'ADD_TWEET', payload });
        },

        toggleForm(payload) {
            dispatch({ type: 'TOGGLE_FORM', payload });
        },

        updateFilter(payload) {
            dispatch({ type: 'UPDATE_FILTER', payload });
        },

        fetchTweets() {
            dispatch({ type: 'LOAD_TWEETS' });
        },
    };
}

export default connect(mapStateToProps, mapActionsToProps)(MainPage);
