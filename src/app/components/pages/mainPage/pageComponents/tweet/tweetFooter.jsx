import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

class TweetFooter extends PureComponent {
    constructor() {
        super();
        this.pressButtonHandler = this.pressButtonHandler.bind(this);
        this.isButtonPressed = this.isButtonPressed.bind(this);
    }

    setTextareaFocus() {
        document.getElementById(`commentTextarea-${this.props.id}`).focus();
    }

    isButtonPressed(prop) {
        const { props } = this;
        return props[prop].indexOf(props.userInfo.get('userName')) >= 0;
    }

    pressButtonHandler(prop, map) {
        const { userInfo, id } = this.props;
        const userName = userInfo.get('userName');

        let arr = map.toArray();

        if (arr.indexOf(userName) >= 0) {
            arr = arr.filter(item => item !== userName);
        } else {
            arr.push(userName);
        }

        this.props.updateTweet({ arr, prop, id });
    }

    render() {
        const { likes, retweets } = this.props;
        const { id, deleteTweet, comments } = this.props;

        return (
            <div className="tweet-footer">
                <button
                  className={`likes ${this.isButtonPressed('likes') ? 'active' : ''}`}
                  onClick={() => this.pressButtonHandler('likes', likes)}
                >
                    <i className={`fa${this.isButtonPressed('likes') ? 's' : 'r'} fa-heart with-tooltip`} />
                    <span className="tooltip">Like</span>
                    {likes.size}
                </button>
                <button className="comments" onClick={() => this.setTextareaFocus()}>
                    <i className="far fa-comment with-tooltip" />
                    <span className="tooltip">Reply</span>
                    {comments.size}
                </button>
                <button
                  className={`retweets ${this.isButtonPressed('retweets') ? 'active' : ''}`}
                  onClick={() => this.pressButtonHandler('retweets', retweets)}
                >
                    <i className="fas fa-retweet with-tooltip" />
                    <span className="tooltip">Share</span>
                    {retweets.size}
                </button>
                <button className="btn btn_small" onClick={() => deleteTweet(id)}>
                    <i className="far fa-trash-alt" />
                    to trash
                </button>
            </div>
        );
    }
}

TweetFooter.propTypes = {
    likes: PropTypes.instanceOf(Immutable.List).isRequired,
    retweets: PropTypes.instanceOf(Immutable.List).isRequired,
    comments: PropTypes.instanceOf(Immutable.List).isRequired,
    userInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
    id: PropTypes.string.isRequired,
    deleteTweet: PropTypes.func.isRequired,
    updateTweet: PropTypes.func.isRequired,
};

export default TweetFooter;
