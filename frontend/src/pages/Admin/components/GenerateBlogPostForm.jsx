import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from "../../../components/Inputs/Input";
import axiosInstance from '../../../utils/axiosInstance';
import { API_PATHS } from '../../../utils/apiPaths';
import { LuLoaderCircle } from 'react-icons/lu';

const GenerateBlogPostForm = ({ contentParams, setPostContent, handleCloseForm}) => {

  const [formData, setFormData] = useState({
    title: contentParams?.title || "",
    tone: contentParams?.tone || "",
  });

  // 🔄 Sync formData when contentParams changes (e.g. when modal opens)
  useEffect(() => {
    if (
      contentParams &&
      (contentParams.title !== formData.title || contentParams.tone !== formData.tone)
    ) {
      setFormData({
        title: contentParams.title || "",
        tone: contentParams.tone || "",
      });
    }
  }, [contentParams]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
        ...prevData,
        [key]: value,
    }));
  };

  const handleGeneratedBlogPost = async(e) => {
    e.preventDefault();

    const { title, tone } = formData;

    if(!title || !tone){
        setError("Please fill all the required fields.");
        return;
    }
    setError("");
    setIsLoading(true);

    try {
        // call AI API to generate blog post
        const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_BLOG_POST, {
            title, 
            tone,
        });

        const generatedPost = aiResponse.data;
        setPostContent(title, generatedPost || "");
        handleCloseForm();
    } catch (error) {
        if(error.response && error.response.data.message){
            setError(error.response.data.message);
        }else{
            setError("Something went wrong. Please try again.");
        }
    }finally{
        setIsLoading(false);
    }
  };

  return <div className='w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center '>
        <h3 className='text-lg font-semibold text-black'>Generate a Blog Post</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-3'>
            Provide a title and tone to generate your blog post.
        </p>

        <form onSubmit={handleGeneratedBlogPost} className='flex flex-col gap-3'>
            <Input 
                value={formData.title}
                onChange={({ target }) => handleChange("title", target.value)}
                label="Blog Post Title"
                placeholder=""
                type="text"
            />

            <Input 
                value={formData.tone}
                onChange={({ target }) => handleChange("tone", target.value)}
                label="Tone"
                placeholder="beginner, technical, casual etc"
                type="text"
            />

            {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

            <button
                type='submit'
                className='btn-primary w-full mt-2'
                disabled={isLoading}
            >
                {isLoading && <LuLoaderCircle className='animate-spin text-[18px]' />}{" "}
                {isLoading ? "Generating..." : "Generate Post"}
            </button>
        </form>
  </div>
};

export default GenerateBlogPostForm;

