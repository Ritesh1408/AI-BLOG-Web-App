import React from "react";
import { LuHeart, LuEye } from 'react-icons/lu';
// added for image TODO:
// import { getImageUrl } from '../../../utils/getImageUrl';
const FeaturedBlogPost = ({
  title,
  coverImageUrl,
  description,
  tags = [],
  updatedOn,
  authorName,
  authorProfileImg,
  onClick,
//   likes,
//   views,
}) => {

  return <div 
        className="grid grid-cols-12 bg-white shadow-lg shadow-gray-100 rounded-xl overflow-hidden cursor-pointer"
        onClick={onClick}
        >
            <div className="col-span-6">
                <img 
                    src={coverImageUrl}
                    alt={title}
                    className="w-full h-80 object-cover"
                />
            </div>

            <div className="col-span-6">
                <div className="p-6">
                    <h2 className="text-lg md:text-2xl font-bold mb-2 line-clamp-3">
                        {title}
                    </h2>
                    <p className="text-gray-700 text-[13px] mb-4 line-clamp-3">
                        {description}
                    </p>

                    <div className="flex items-center flex-wrap gap-2 mb-4">
                        {tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="bg-sky-200/50 text-sky-800/80 text-xs font-medium px-3 py-0.5 rounded-full text-nowrap"
                            >
                                # {tag}
                            </span>
                        ))}
                    </div>

                        {/* <img 
                            src={authorProfileImg}
                            alt={authorName}
                            className="w-8 h-8 rounded-full mr-2"
                        /> */}
                    <div className="flex items-center">
                        {authorProfileImg ? (
                            <img 
                                src={authorProfileImg} 
                                alt={authorName} 
                                className="w-8 h-8 rounded-full mr-2 object-cover" 
                            />
                            ) : (
                            <div className="w-8 h-8 rounded-full mr-2 bg-gray-300 flex items-center justify-center text-sm font-semibold text-white uppercase">
                                {authorName?.charAt(0)}
                            </div>
                        )}

                        <div>
                            <p className="text-gray-600 text-sm">{authorName}</p>
                            <p className="text-gray-500 text-xs">{updatedOn}</p>
                        </div>
                        
                    </div>
                        {/* <div className="flex items-center justify-start gap-2 mt-1.5">
                            <LuHeart className="text-gray-500" /> {likes} Likes{" "}
                            <span className="flex items-center gap-2"><LuEye className="text-blue-500" />{views} Views</span>
                        </div> */}
                </div>
            </div>

  </div>;
};

export default FeaturedBlogPost;
