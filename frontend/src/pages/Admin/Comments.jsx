import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import CommentInfoCard from '../../components/Cards/CommentInfoCard';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import Modal from '../../components/Modal';
import DeleteAlertContent from '../../components/DeleteAlertContent';

const Comments = () => {

  const navigate = useNavigate();
  const [comments, setComments] = useState([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  //get all comments
  const getAllComments = async() => {
    try {
      const response = await axiosInstance.get(API_PATHS.COMMENTS.GET_ALL);
      setComments(response.data?.length > 0 ? response.data : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //delete comment
  const deleteComment = async(commentId) => {
    try {
      const response = await axiosInstance.delete(API_PATHS.COMMENTS.DELETE(commentId));

      toast.success("Comment Deleted Succesfully!");
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
      getAllComments();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAllComments();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu='Comments'>
      <div className='w-auto sm:max-w-[900px] mx-auto'>
        <h2 className='text-2xl font-semibold mt-5 mb-5'>Comments</h2>

        {comments.map((comment) => (
          <CommentInfoCard 
            key={comment._id}
            commentId={comment._id || null}
            authorName={comment.author.name}
            authorPhoto={comment.author.profileImageUrl}
            content={comment.content}
            updatedOn={comment.updatedAt ? moment(comment.updatedAt).format("DD MMMM YYYY") : "-" }
            post={comment.post}
            replies={comment.replies || []}
            getAllComments={getAllComments}
            onDelete={(commentId) => 
              setOpenDeleteAlert({ open:true, data: commentId || comment._id })
            }
          />
        ))}
      </div>

      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => {
          setOpenDeleteAlert({ open: false, data: null });
        }}
        title="Delete Alert"
      >
        <div className='w-[30vw]'>
          <DeleteAlertContent
            content="Are you sure you want to delete this comment?"
            onDelete={() => deleteComment(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  )
}

export default Comments;
