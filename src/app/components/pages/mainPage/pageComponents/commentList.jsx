import React, { PureComponent } from 'react';

class CommentList extends PureComponent {
    constructor() {
        super();
    }

    render() {
        const comments = this.props.comments.map(comment => (
            <li>
                {comment.commentText}
            </li>
        ))
        return (
            <ul>
                {comments}
            </ul>
        )
    }
}

export default CommentList;
