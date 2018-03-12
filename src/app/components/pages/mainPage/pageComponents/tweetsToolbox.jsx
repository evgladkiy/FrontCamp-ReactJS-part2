import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleFormAction, updateFilterAction } from './../../../../actions/tweetsToolboxActions';

class TweetsToolbox extends PureComponent {
    constructor() {
        super();
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler() {
        if (!this.props.shouldShowForm) {
            this.props.toggleForm(true);
        }
    }

    render() {
        return (
            <div>
                <div className="filter-container">
                    <i className="fas fa-search" />
                    <input
                      className="input"
                      type="search"
                      placeholder="Filter by author"
                      ref={(input) => { this.input = input; }}
                      onChange={() => this.props.updateFilter(this.input.value)}
                    />
                </div>
                <button className="btn" onClick={this.onClickHandler}>
                    <i className="fas fa-plus" />
                    Add new tweet
                </button>
            </div>
        );
    }
}

TweetsToolbox.propTypes = {
    shouldShowForm: PropTypes.bool.isRequired,
    toggleForm: PropTypes.func.isRequired,
    updateFilter: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        shouldShowForm: state.toolbox.get('shouldShowForm'),
    };
}

function mapActionsToProps(dispatch) {
    return {
        toggleForm(bool) {
            dispatch(toggleFormAction(bool));
        },

        updateFilter(filter) {
            dispatch(updateFilterAction(filter));
        },
    };
}

export default connect(mapStateToProps, mapActionsToProps)(TweetsToolbox);
