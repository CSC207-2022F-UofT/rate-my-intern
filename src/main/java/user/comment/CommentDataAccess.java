package user.comment;

import entity.Review;
import entity.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

public class CommentDataAccess implements ICommentDataAccess {

    @Override
    public Review getReview(String reviewID) {
        // add the try/catch here
        // catch the exception generated by the query
        // return null/review based on exception being caught


        // figure out how to access the reviews in the database
        Review review = new Review();
        return review;
    }

    @Override
    public void updateReview(Review review) {

    }

    @Override
    public void insertComment(Comment comment){

    }



}
