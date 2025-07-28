export const BASE_URL = "https://ai-blog-backend-8ut5.onrender.com";

export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register", // signup
        LOGIN: "/api/auth/login", // Authenticate user and return jwt
        GET_PROFILE: "/api/auth/profile",
    },

    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image", // upload profile picture
    },

    DASHBOARD: {
        GET_DASHBOARD_DATA: "/api/dashboard-summary", // get dashboard data
    },

    AI: {
        GENERATE_BLOG_POST: "/api/ai/generate", // Generate a blog post using AI
        GENERATE_BLOG_POST_IDEAS: "/api/ai/generate-ideas", // generate a blog ideas using AI
        GENERATE_COMMENT_REPLY: "/api/ai/generate-reply", // generate a reply using AI
        GENERATE_POST_SUMMARY: "/api/ai/generate-summary", // generate Blog post summary using AI
    },

    POSTS: {
        CREATE: "/api/posts", // create a new blog post (Admin only)
        GET_ALL: "/api/posts", // get all publlished blog posts
        GET_TRENDING_POSTS: "/api/posts/trending", // get trending blog posts
        GET_BY_SLUG: (slug) => `/api/posts/slug/${slug}`, // get post by slug
        UPDATE: (id) => `/api/posts/${id}`, // update a blog post
        DELETE: (id) => `/api/posts/${id}`, // delete a post
        // GET_BY_TAG: (tag) => `/api/posts/${tag}`,
        GET_BY_TAG: (tag) => `/api/posts/tag/${encodeURIComponent(tag)}`,
        SEARCH: "/api/posts/search",
        INCREMENT_VIEW: (id) => `/api/posts/${id}/view`,
        LIKE: (id) => `/api/posts/${id}/like`,
    },

    COMMENTS: {
        ADD: (postId) => `/api/comments/${postId}`,
        GET_ALL: "/api/comments",
        GET_ALL_BY_POST: (postId) => `/api/comments/${postId}`,
        DELETE: (commentId) => `/api/comments/${commentId}`,
    },
};

