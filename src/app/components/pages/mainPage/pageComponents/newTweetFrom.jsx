import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';

import { toggleFormAction } from './../../../../actions/tweetsToolboxActions';
import { addTweetAction } from './../../../../actions/tweetsActions';
import { getCurrentDate } from './tweet/tweetHelpers';

export class NewTweetForm extends PureComponent {
    constructor() {
        super();
        this.formSubmitHandler = this.formSubmitHandler.bind(this);
    }

    formSubmitHandler(e) {
        const text = this.textarea.value.trim();
        const { userInfo } = this.props;

        e.preventDefault();

        if (text !== '') {
            const newTweet = {
                tweetAuthor: userInfo.get('userName'),
                email: userInfo.get('email'),
                tweetText: text,
                likes: [],
                retweets: [],
                comments: [],
                tweetDate: getCurrentDate(),
                avatar: userInfo.get('avatar'),
            };

            this.textarea.value = '';
            this.props.addTweet(newTweet);
            this.props.toggleForm(false);
        }
    }

    render() {
        if (this.props.shouldShowForm) {
            return (
                <form onSubmit={this.formSubmitHandler}>
                    <h3>Write new tweet</h3>
                    <div className="input-container">
                        <label htmlFor="textarea">Tweet text<span>*</span></label>
                        <textarea
                          id="textarea"
                          className="input"
                          placeholder="any tweet text"
                          required
                          ref={(textarea) => { this.textarea = textarea; }}
                        />
                    </div>
                    <div className="btn-container">
                        <button
                          type="button"
                          className="btn"
                          onClick={() => this.props.toggleForm(false)}
                        >
                            Close Form
                            <i className="fas fa-times" />
                        </button>
                        <button type="submit" className="btn">
                            Publish Tweet
                            <i className="fas fa-location-arrow" />
                        </button>
                    </div>
                </form>
            );
        }

        return '';
    }
}

NewTweetForm.propTypes = {
    userInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
    addTweet: PropTypes.func.isRequired,
    toggleForm: PropTypes.func.isRequired,
    shouldShowForm: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        shouldShowForm: state.toolbox.get('shouldShowForm'),
        userInfo: state.user.get('userInfo'),
    };
}

function mapActionsToProps(dispatch) {
    return {
        toggleForm(bool) {
            dispatch(toggleFormAction(bool));
        },

        addTweet(tweet) {
            dispatch(addTweetAction(tweet));
        },
    };
}

export default connect(mapStateToProps, mapActionsToProps)(NewTweetForm);
