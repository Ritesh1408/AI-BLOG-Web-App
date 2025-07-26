import React from 'react';
import { useNavigate } from "react-router-dom";
import { LuHeart, LuEye } from 'react-icons/lu';


const BlogPostSummaryCard = ({
    title,
  coverImageUrl,
  description,
  tags = [],
  updatedOn,
  authorName,
  authorProfileImg,
  onClick,
  likes,
  views,
}) => {

  const navigate = useNavigate();  

  return <div
        className='bg-white shadow-lg shadow-gray-100 rounded-xl overflow-hidden cursor-pointer'
        onClick={onClick}
      >

        <img 
          src={coverImageUrl}
          alt={title}
          className='w-full h-64 object-cover'
        />

        <div className='p-4 md:p-6'>
          <h2 className='text-base md:text-lg font-bold mb-2 line-clamp-3'>
            {title}
          </h2>

          <p className='text-gray-700 text-xs mb-4 line-clamp-3'>{description}</p>

          <div className='flex items-center flex-wrap gap-2 mb-4'>
            {tags.slice(0,3).map((tag, index) => (
              <button
                key={index}
                className='bg-sky-200/50 text-sky-800/80 text-xs font-medium px-3 py-0.5 rounded-full text-nowrap cursor-pointer'
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/tag/${tag}`)
                }}
              >
                # {tag}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between w-full mt-2">
            {/* Author Info */}
            <div className="flex items-center">
              {/* <img 
                src={authorProfileImg}
                alt={authorName}
                className="w-8 h-8 rounded-full mr-3"
              /> */}
              {authorProfileImg ? (
                <img
                  src={authorProfileImg}
                  alt={authorName}
                  className="w-8 h-8 rounded-full mr-3 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3 text-sm font-semibold">
                  {authorName?.charAt(0).toUpperCase()}
                </div>
              )}

              <div>
                <p className="text-gray-600 text-sm">{authorName}</p>
                <p className="text-gray-500 text-xs">{updatedOn}</p>
              </div>
            </div>

            {/* Likes & Views */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <LuHeart className="text-gray-500" />
                <span>{likes} Likes</span>
              </div>

              <div className="flex items-center gap-1">
                <LuEye className="text-blue-500" />
                <span>{views} Views</span>
              </div>
            </div>
          </div>

        </div>
  </div>
};

export default BlogPostSummaryCard;
