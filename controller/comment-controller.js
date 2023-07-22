import { response } from "express";
import Comment from "../model/comment.js"

export const newComment=async (request,response)=>{
    try {
        // validating the request body with schema
        const comment=await new Comment(request.body);
        // save in database
        comment.save();
        return response.status(200).json({ msg: 'Comment saved Successfully' });
    } catch (error) {
        return response.status(500).json({ msg: error.message });
    }
}
export const getComments=async (request,response)=>{
    try {
        const comments=await Comment.find({postId:request.params.id});
        // const comments=await Comment.find({postId:request.params.id});
        return response.status(200).json(comments);
    } catch (error) {
        return response.status(500).json({ msg: error.message });
    }
}

export const deleteComment = async (request, response) => {
    try {
        const comment = await Comment.findByIdAndDelete(request.params.id);

        if (!comment) {
            return response.status(404).json({ msg: 'comment not found!' });
        }

        return response.status(200).json({ msg: 'Deleted Successfully' });
    } catch (error) {
        return response.status(500).json({msg: error.message });
    }
}