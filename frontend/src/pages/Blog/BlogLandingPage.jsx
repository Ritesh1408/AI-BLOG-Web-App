import React, { useEffect, useState } from 'react'
import BlogLayout from '../../components/Layouts/BlogLayout/BlogLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import {
  LuGalleryVerticalEnd,
  LuLoaderCircle,
  LuLoaderPinwheel
} from "react-icons/lu";
import FeaturedBlogPost from './components/FeaturedBlogPost';
import BlogPostSummaryCard from '../../pages/Blog/components/BlogPostSummaryCard';
import TrendingPostSection from './components/TrendingPostSection';

const BlogLandingPage = () => {

  const navigate = useNavigate();

  const [blogPostList, setBlogPostList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch paginated posts
  const getAllPosts = async (pageNumber = 1) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.POSTS.GET_ALL, {
        params: {
          status: "published",
          page: pageNumber,
        },
      });

      const { posts, totalPages } = response.data;

      setBlogPostList((prevPost) => pageNumber === 1 ? posts : [...prevPost, ...posts]);

      setTotalPages(totalPages);
      setPage(pageNumber);
    } catch (error) {
      console.error("Error fetching data:", error);
    }finally{
      setIsLoading(false);
    }
  };

  // Load more posts
  const handleLoadMore = () => {
    if(page < totalPages){
      getAllPosts(page + 1);
    }
  };

  //Initial Load
  useEffect(() => {
    getAllPosts(1);
  }, []);

  const handleClick = (post) => {
    if (!post?.slug) return;
    navigate(`/posts/${post.slug}`);
  };



  return <BlogLayout>
      <div className='lg:px-16'>
        {/* Above css add later */}
        <div className='grid grid-cols-12 gap-5'>
          <div className='col-span-12 md:col-span-9'>
            {blogPostList.length > 0 && (
              <FeaturedBlogPost 
                title={blogPostList[0].title}
                coverImageUrl = {blogPostList[0].coverImageUrl}
                description={blogPostList[0].content}
                tags={blogPostList[0].tags}
                updatedOn={
                  blogPostList[0].updatedAt ? moment(blogPostList[0].updatedAt).format("Do MM YYYY") : "-"
                }
                authorName={blogPostList[0].author.name}
                authorProfileImg={blogPostList[0].author.profileImageUrl}
                onClick={() => handleClick(blogPostList[0])}
                // likes={blogPostList[0].likes}
                // views={blogPostList[0].views}
              />
            )}


            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
              {blogPostList.length > 0 && 
                blogPostList.slice(1).map((item) => (
                  <BlogPostSummaryCard 
                    key={item._id}
                    title={item.title}
                    coverImageUrl={item.coverImageUrl}
                    description={item.description}
                    tags={item.tags}
                    updatedOn={
                      item.updatedAt ? moment(item.updatedAt).format("Do MMM YYYY") : "-"
                    }
                    authorName={item.author.name}
                    authorProfileImg={item.author.profileImageUrl}
                    onClick={() => handleClick(item)}
                    likes={item.likes}
                    views={item.views}
                  />
                ))
              }
            </div>

            {page < totalPages && (
              <div className='flex items-center justify-center mt-5'>
                <button
                  className='flex items-center gap-3 text-sm text-white font-medium bg-black px-7 py-2.5 mt-6 rounded-full text-nowrap hover:scale-105 transition-all cursor-pointer'
                  disabled={isLoading}
                  onClick={handleLoadMore}
                >
                  {isLoading ? (
                    // <LuLoaderCircle className='animate-spin text-[15px]' />
                    <LuLoaderPinwheel className='animate-spin text-[15px]' />
                  ) : (
                    <LuGalleryVerticalEnd className='text-lg' />
                  )}{" "}
                  {isLoading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </div>

          <div className='col-span-12 md:col-span-3'>
            <TrendingPostSection />
          </div>
        </div>
      </div>
  </BlogLayout>;
};

export default BlogLandingPage;
