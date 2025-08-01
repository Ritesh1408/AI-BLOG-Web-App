const { GoogleGenAI } = require("@google/genai");
const {
    blogPostIdeasPrompt,
    generateReplyPrompt,
    blogSummaryPrompt,
} = require("../utils/prompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

//@desc Generate blog content from title
//@route Post /api/ai/generate
//@access Private

const generateBlogPost = async (req, res) => {
    try {

        const { title, tone } = req.body;
        if(!title || !tone){
            return res.status(400).json({ message: "Missing required fields" });
        }
        const prompt = `Write a markdown-formatted blog post titled "${title}". Use a ${tone} tone. Include an introduction, subheadings, code examples if relevant, and a conclusion.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });
        let rawText = response.text;
        res.status(200).json(rawText);
    } catch (error) {
        res.status(500).json({
            message: "Failed to generate blog post",
            error: error.message,
        });
    }
};

//@desc Generate blog posts ideas from titlt
//@route POST /api/ai/generate-ideas
//@access Private
const generateBlogPostIdeas = async(req, res) => {
    try {
        const { topics } = req.body;
        if(!topics){
            return res.status(400).json({ message: "Missing required fields" });
        }
        const prompt = blogPostIdeasPrompt(topics);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });

        let rawText = response.text;

        // clean it: remove ```json and ``` from beginning and end
        const clearText = rawText
            .replace(/^```json\s*/, "") // remove starting ```json
            .replace(/```$/, "") // remove ending ```json
            .trim(); // remove extra spaces
        
        // Now safe to parse
        const data = JSON.parse(clearText);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "Failed to generate blog post Ideas, Try again after some time.",
            error: error.message,
        });
    }
};

//@desc Generate comment reply
//@route POST /api/ai/generate-reply
//@access Private
const generateCommentReply = async(req, res) => {
    try {
        const { author, content } = req.body;
        if(!content){
            return res.status(400).json({ message: "Missing required fields" });
        }

        const prompt = generateReplyPrompt({ author, content });
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });

        let rawText = response.text;
        res.status(200).json(rawText);
        
    } catch (error) {
        res.status(500).json({
            message: "Failed to generate reply.",
            error: error.message,
        });
    }
};

//@desc Generate blog post summary
//@route POST /api/ai/generate-summary
//@access Private

const generatePostSummary = async(req, res) => {
    try {
        const { content } = req.body;
        if(!content){
            return res.status(400).json({ message: "Missing required filed" });
        }

        const prompt = blogSummaryPrompt(content);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });

        let rawText = response.text;

        const clearText = rawText
            .replace(/^```json\s*/, "")
            .replace(/```$/, "")
            .trim();
        
        const data = JSON.parse(clearText);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "Failed to generate blog post summary, Try again or after some time.",
            error: error.message,
        });
    }
};

module.exports = {
    generateBlogPost,
    generateBlogPostIdeas,
    generateCommentReply,
    generatePostSummary,
};

