import React from 'react';
import moment from 'moment';
import { LuDot } from 'react-icons/lu';

const RecentCommentList = ({ comments }) => {
  return (
    <div className='mt-4'>
      <ul className='space-y-4'>
        {comments?.slice(0, 10)?.map((comment) => (
          <li
            key={comment._id}
            className='flex gap-4 border-b border-gray-100 pb-4 last:border-none'
          >
            {/* <img
              src={comment.author?.profileImageUrl}
              alt={comment.author?.name}
              className='w-10 h-10 rounded-full object-cover'
            /> */}
            {comment.author?.profileImageUrl ? (
              <img
                src={comment.author.profileImageUrl}
                alt={comment.author?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                {comment.author?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            
            <div className='flex-1'>
              <div className='flex justify-start items-start'>
                <div>
                  <div className='flex items-center gap-1'>
                    <p className='font-medium text-[13px] text-gray-500'>
                      @{comment.author?.name}
                    </p>

                    <LuDot className='text-gray-500' />

                    <span className='text-[12px] text-gray-500 font-medium'>
                      {moment(comment.updatedAt).format('DD MMM YYYY')}
                    </span>
                  </div>

                  <p className='text-sm text-black mt-0.5'>
                    {comment.content}
                  </p>
                </div>
              </div>

              {comment.post ? (
                <div className='mt-2 flex items-center gap-3'>
                  <img
                    src={comment.post.coverImageUrl}
                    alt={comment.post.title}
                    className='w-9 h-9 rounded-md object-cover'
                  />

                  <p className='text-[13px] text-gray-700 line-clamp-2'>
                    {comment.post.title}
                  </p>
                </div>
              ) : (
                <p className='text-[12px] text-gray-400 italic mt-2'>
                  Post no longer exists
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentCommentList;
