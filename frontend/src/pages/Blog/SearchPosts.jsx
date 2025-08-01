import React, { useEffect, useState } from 'react';
import BlogLayout from '../../components/Layouts/BlogLayout/BlogLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BlogPostSummaryCard from './components/BlogPostSummaryCard';
import moment from 'moment';

const SearchPosts = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async() => {
    try {
      const response = await axiosInstance.get(API_PATHS.POSTS.SEARCH, {
        params: { q: query },
      });
      if(response.data){
        setSearchResults(response.data || []);
      }
    } catch (error) {
      console.error("Error searching : ", error);
    }
  };

  // handle click to post
  const handleClick = (post) => {
    navigate(`/posts/${post.slug}`);

  };

  useEffect(() => {
    console.log("query", query);
    handleSearch();

    return () => {};
  }, [query]);


  return (
    <BlogLayout>
      <div className='lg:px-16'>
        <h3 className='text-lg font-medium'>
          Showing search results matching "<span className='font-semibold'>{query}</span>"
        </h3>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
          {searchResults.length > 0 && 
            searchResults.map((item) => (
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
      </div>
    </BlogLayout>
  )
};

export default SearchPosts;
