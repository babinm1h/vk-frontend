import React, { FC } from 'react';
import { IComment } from '../../types/comment.types';
import { IUser } from '../../types/user.types';
import Comment from "./Comment"

interface ICommentsListProps {
    comments: IComment[]
    refetchComments: Function
    user: IUser | null
    postId: string
}

const CommentsList: FC<ICommentsListProps> = ({ comments, postId, refetchComments, user }) => {
    return (
        <ul className="flex flex-col gap-5">
            {comments.map(c => <Comment key={c._id} item={c}
                refetchComments={refetchComments}
                user={user} postId={postId} />)}
        </ul>
    );
};

export default CommentsList;