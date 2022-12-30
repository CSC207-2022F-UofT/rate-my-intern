import { useState } from 'react';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import CommentBox from './CommentBox';
import useAuthContext from '../AuthContext';

export default function CommentCard({
  commentId,
  userId,
  parentType,
  reviewId,
  parentId,
  content,
  datePosted,
  comments,
}) {
  const { corporateId, internshipId } = useParams();
  const [showComment, setShowComment] = useState(false);
  const [moreComments, setMoreComments] = useState(comments);
  const [clickedDelete, setClickedDelete] = useState(false);
  const { principal } = useAuthContext();
  const handleDelete = () => {
    console.log(commentId, parentType, parentId, userId);
    setClickedDelete(true);
    axios
      .delete(
        `/corporates/${corporateId}/internships/${internshipId}/reviews/${reviewId}/comments/${commentId}`,
        {
          data: {
            parentType: parentType,
            parentId: parentId,
            commentId: commentId
          },
        }
      )
      .then(() => {
        window.location.reload();
      });
    setTimeout(() => {
      setClickedDelete(false);
    }, 3000);
  };
  const handleShowCommentBox = () => {
    setShowComment(!showComment);
  };

  const postComment = (parentType, parentId, comment) => {
    console.log(parentType, parentId, comment, reviewId);
    axios
      .post(`/corporates/${corporateId}/internships/${internshipId}/reviews/${reviewId}/comments`, {
        parentType: parentType,
        parentId: parentId,
        content: comment,
      })
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          setShowComment(false);
          setMoreComments([
            ...moreComments,
            {
              user: {
                username: principal.username
              },
              id: res.data.id,
              content: comment,
              comments: [],
              datePosted: res.data.datePosted,
            },
          ]);
        }
      });
  };

  return (
    <Box
      sx={{
        borderRadius: 5,
        py: 1,
        pl: 2,
      }}>
      <Box textAlign={'start'}>
        <Typography variant='h5'>{userId}: </Typography>
        <Typography>{content}</Typography>
        <Box textAlign={'right'}>
          <Typography sx={{ ml: 'auto' }}>{datePosted.match(/^\d{4}-\d{2}-\d{2}/)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', my: 1 }}>
          <Button
            sx={{ ml: 'auto', mr: 1 }}
            variant='contained'
            onClick={handleShowCommentBox}
            color='primary'
            size='small'>
            comment
          </Button>
          <Button
            variant='contained'
            onClick={handleDelete}
            color='error'
            size='small'
            disabled={clickedDelete}>
            delete
          </Button>
        </Box>
      </Box>
      {showComment ? (
        <Box sx={{ mt: 2 }}>
          <CommentBox
            handleShowCommentBox={handleShowCommentBox}
            postComment={postComment}
            parentType={'Comment'}
            parentId={commentId}
          />
        </Box>
      ) : undefined}

      {moreComments.length > 0 &&
        moreComments.map((comment) => {
          return (
            <CommentCard
              key={comment.id}
              reviewId={reviewId}
              parentType={'Comment'}
              commentId={comment.id}
              parentId={commentId}
              userId={comment.user.username}
              content={comment.content}
              datePosted={comment.datePosted}
              comments={comment.comments}
            />
          );
        })}
    </Box>
  );
}
