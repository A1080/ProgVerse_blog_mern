import { response } from "express";
import Post from "../model/post.js";


export const createPost=async (request,response)=>{
    try {
        const post=await new Post(request.body);
        post.save();
        const statusCode = 200; 
        const popupMessage = statusCode === 200 ? 'Post Created successfully!' : 'Error uploading Post!';
        alert(popupMessage);
        return response.status(200).json('Post saved successfully');
    } catch (error) {
        return response.status(500).json(error);
    }
}
export const getAllPosts=async (request,response)=>{
    let category=request.query.category;
    let posts;
    try {

        if(category){
            posts=await Post.find({categories:category})
        }
        else{
            posts=await Post.find({});
        }

        // fetching all data of the post from the mongodb
        // we want to fetch data conditionally so we have to add object in the find
        // if want all data , make the object empty
        // let posts=await Post.find({});
        return response.status(200).json(posts);
    } catch (error) {
        return response.status(500).json({msg:error.message});
    }
}

export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        return response.status(200).json(post);
    } catch (error) {
        return response.status(500).json({msg:error.message});
    }
}

export const updatePost = async (request, response) => {
    try {
        // fetching previous data of post
        const post = await Post.findById(request.params.id);
        
        // if data of post not found
        if(!post){
            return response.status(404).json({msg:'Post not found!'});
        }

        // if we found the post then we use findbyId and update of mongodb
        await Post.findByIdAndUpdate(request.params.id,{$set:request.body}) // we have two methods first is $set->in an array replace with object and second is $headToSet->append an object in array
        return response.status(200).json({msg:'Post updated Successfully'});
    } catch (error) {
        return response.status(500).json({msg:error.message});
    }
}

export const deletePost = async (request, response) => {
    try {
        const post = await Post.findByIdAndDelete(request.params.id);

        if (!post) {
            return response.status(404).json({ msg: 'Post not found!' });
        }

        return response.status(200).json({ msg: 'Deleted Successfully' });
    } catch (error) {
        return response.status(500).json({ msg: error.message });
    }
}

