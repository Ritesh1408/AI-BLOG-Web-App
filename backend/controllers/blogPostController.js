const BlogPost = require("../models/BlogPost");
const mongoose = require("mongoose");
const Comment = require("../models/Comment");

// @desc Create a new Post
// @route POST /api/posts
// @access Private (Admin only)

const createPost = async (req, res) => {
    try{
        const { title, content, coverImageUrl, tags, isDraft, generatedByAI } = req.body;

        const slug = title.
            toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
        
        const newPost = new BlogPost({
            title,
            slug,
            content,
            coverImageUrl,
            tags,
            author: req.user._id,
            isDraft,
            generatedByAI
        });
        await newPost.save();
        res.status(201).json(newPost);

    }catch(err){
        res.
            status(500)
            .json({ message: "Failed to create Post", error: err.message });
    }
};


// @desc Update an existing  blog post
// @route PUT /api/posts/:id
// @access Private (AUthor or Admin)
const updatePost = async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.author.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(403).json({ message: "Not authorized to update this post" });
        }

        const updatedData = req.body;

        if (updatedData.title) {
            updatedData.slug = updatedData.title.toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "");
        }

        const updatedPost = await BlogPost.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};


//@desc Delete a blog post
// @route DELETE /api/posts/:id
// @access Private (Author or admin)
const deletePost = async(req, res) => {
    try{
        const post = await BlogPost.findById(req.params.id);
        if(!post) return res.status(404).json({ message: "Post not found" });

         // Delete all comments linked to this post
        await Comment.deleteMany({ post: post._id }); // updated this bug
        
        await post.deleteOne();
        res.json({message: "Post deleted Successfully." });
    }catch(err){
        res.
            status(500)
            .json({ message: "Server Error", error: err.message });
    }
};

//@desc Get blog posts by status (all, published, or draft) and include counts
//@route GET /api/posts?status=published[draft]all&page=1
//@access Public
const getAllPosts = async(req, res) => {
    try{
        const status = req.query.status || "published";
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;
        
        // Determine filter for main posts response
        let filter = {};
        if(status === "published") filter.isDraft = false;
        else if(status === "draft") filter.isDraft = true;

        // Fetch posts pagination posts
        const posts = await BlogPost.find(filter)
            .populate("author", "name profileImageUrl")
            .sort({ updatedAt: -1 })
            .skip(skip)
            .limit(limit);

        // Count totals for pagination and tab counts
        const [totalCount, allCount, publishedCount, draftCount] = await Promise.all([
            BlogPost.countDocuments(filter), // for pagination of current tab
            BlogPost.countDocuments(),
            BlogPost.countDocuments({ isDraft: false }),
            BlogPost.countDocuments({ isDraft: true}),
        ]);

        res.json({
            posts,
            page,
            totalPages: Math.ceil(totalCount / limit),
            totalCount,
            counts: {
                all: allCount,
                published: publishedCount,
                draft: draftCount,
            },
        });

    }catch(err){
        res.
            status(500)
            .json({ message: "Server Error", error: err.message });
    }
};

//@desc Get a single post by slug
// @route GET /api/post/:slug
//@access public

const getPostBySlug = async(req, res) => {
    try{
        const post = await BlogPost.findOne({ slug: req.params.slug }).populate("author", "name profileImageUrl");
        if(!post) return res.status(404).json({ message: "Post not found" });
        res.json(post);
    }catch(err){
        res.
            status(500)
            .json({ message: "Server Error", error: err.message });
    }
};

//@desc Get posts by tag
//@route GET api/posts/tag/:tag
//@access Public
const getPostByTag = async(req, res) => {
    try{
        const posts = await BlogPost.find({ tags: req.params.tag, isDraft: false }).populate("author", "name profileImageUrl");
        res.json(posts);
    }catch(err){
        res.
            status(500)
            .json({ message: "Server Error", error: err.message });
    }
};

//@desc Search post by title or content
//@route GET /api/post/search?q=keyword
//@access Public

const searchPosts = async(req, res) => {
    try{
        const q = req.query.q;
        const posts = await BlogPost.find({ 
            isDraft: false,
            $or: [
                {title: { $regex: q, $options: "i"}},
                {content: { $regex: q, $options: "i"}},
            ],
        }).populate("author", "name profileImageUrl");
        res.json(posts);
    }catch(err){
        res.
            status(500)
            .json({ message: "Server Error", error: err.message });
    }
};

//@desc Increment post view count
//@route PUT /api/posts/:id/view
//@access Public

const incrementView = async(req, res) => {
    try{
        await BlogPost.findByIdAndUpdate(req.params.id, { $inc: { views: 1 }});
        res.json({ message: "View Count incremented"});
    }catch(err){
        res.
            status(500)
            .json({ message: "Server Error", error: err.message });
    }
};

//@desc Like apost 
// @route PUT /api/post/:id/like
//@access Public
const likePost = async(req, res) => {
    try{
        await BlogPost.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 }});
        res.json({ message: "Likes Added."});
    }catch(err){
        res.
            status(500)
            .json({ message: "Server Error", error: err.message });
    }
};

// @desc Get top posts trending
//@route GET /api/posts/trending
// @access Private
const getTopPosts = async(req, res) => {
    try{
        // Top performing post
        const posts = await BlogPost.find({ isDraft: false })
        .sort({ views: -1, likes: -1 })
        .limit(5);

        res.json(posts);

    }catch(err){
        res.
            status(500)
            .json({ message: "Server Error", error: err.message });
    }
};

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getAllPosts, getPostBySlug,
    getPostByTag,
    searchPosts,
    incrementView,
    likePost,
    getTopPosts
};