import { IPostDocument } from '@/models/post.model'
import React from 'react'
import Comment from './Comment'
import { ICommentDocument } from '@/models/comment.model'


//bugfix

const Comments = ({post}:{post:IPostDocument}) => {
  return (
    <div>
    {
        post?.comments?.map((comment: ICommentDocument) => (
            <Comment key={comment._id} comment={comment} />
        ))
    }
</div>
  );
}

export default Comments
