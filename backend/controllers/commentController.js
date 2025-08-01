const Comment = require("../models/Comment");
const BlogPost = require("../models/BlogPost");
// const { post } = require("../routes/authRoutes");

//@desc Add a comment to a Blog post
//@route POST /api/comments/:postId
// @access Private
const addComment = async(req, res) => {
    try {
        const { postId } = req.params;
        const { content, parentComment } = req.body;

        // Ensure the blog post exits
        const post = await BlogPost.findById(postId);
        if(!post) return res.status(404).json({ message: "Post not Found."})
        
        const comment = await Comment.create({
            post: postId,
            author: req.user._id,
            content,
            parentComment: parentComment || null,
        });
        await comment.populate("author", "name profileImageUrl");
        res.status(201).json(comment);
    } catch (error) {
        res.
            status(500)
            .json({ message: "Failed to add comment", error: error.message });
    }
};

//@desc Get all comments
//@route GET /api/comments
//@access Public
const getAllComments = async(req, res) => {
    try {
        const comments = await Comment.find().populate("author", "name profileImageUrl")
        .populate("post", "title coverImageUrl")
        .sort({ createdAt: 1}) // optional, so replies come in order
        
        // Create map for commentId -> comment object
        const commentMap = {};
        comments.forEach(comment => {
            comment = comment.toObject(); //convert from mongoose documnet to plain documnet
            comment.replies = [];
            commentMap[comment._id] = comment;
        });

        // Nest resplies under their parentcomment
        const nestedComments = [];
        comments.forEach(comment => {
            if(comment.parentComment){
                const parent = commentMap[comment.parentComment];
                if(parent){
                    parent.replies.push(commentMap[comment._id]);
                }
            }else{
                nestedComments.push(commentMap[comment._id]);
            }
        });
        res.json(nestedComments);
    } catch (error) {
        res.
            status(500)
            .json({ message: "Failed to fetch all comments.", error: error.message });
    }
};

//@desc Get all comments for a blog post
//@route GET /api/comments/:postId
//@access Public
const getCommentsByPost = async(req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ post: postId })
            .populate("author", "name profileImageUrl")
            .populate("post", "title coverImageUrl")
            .sort({ createdAt: 1 }) // optional, so replies come in order
        
        // Create a map for commentId -> comment Object
        const commentMap= {};
        comments.forEach(comment => {
            comment = comment.toObject(); // convert from mongoose documnet to plain object
            comment.replies= [];
            commentMap[comment._id] = comment;
        });

        // Nest replies under the parent comment
        const nestedComments = [];
        comments.forEach(comment => {
            if(comment.parentComment){
                const parent = commentMap[comment.parentComment];
                if(parent){
                    parent.replies.push(commentMap[comment._id]);
                }
            }else{
                nestedComments.push(commentMap[comment._id]);
            }
        });
        res.json(nestedComments);
    } catch (error) {
        res.
            status(500)
            .json({ message: "Failed to fetch all comment.", error: error.message });
    }
};

//@desc Delete a comment and its replies (author or admin only)
//@route DELETE /api/comments/:commentId
//@access Private
const deleteComment = async(req, res) => {
    try {
        const { commentId } = req.params;

        const comment = await Comment.findById(commentId);
        if(!comment){
            return res.status(404).json({ message: "Comment not found."});
        }

        //Delete a comment
        await Comment.deleteOne({ _id: commentId });

        //Delete all replies to this comment (one level nesting only)
        await Comment.deleteMany({ parentComment: commentId });
        res.json({ message: "Comment and any replies deleted successfully."});
    } catch (error) {
        res.
            status(500)
            .json({ message: "Failed to delete a comment.", error: error.message });
    }
};

module.exports = {
    addComment,
    getCommentsByPost,
    deleteComment,
    getAllComments
};

