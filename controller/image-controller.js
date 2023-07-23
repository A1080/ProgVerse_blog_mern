import grid from 'gridfs-stream';
import mongoose from 'mongoose';
const url='https://prog-verse-blog.vercel.app';
// const url='http://localhost:8000';


// check if connection is already established or not , if it is then it returs a callback function 
let gfs,gridfsBucket;
const conn=mongoose.connection;
conn.once('open',()=>{
    gridfsBucket=new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName:'photos'
    });
    gfs=grid(conn.db,mongoose.mongo);
    gfs.collection('photos');
})

export const uploadImage=(request,response)=>{
    // if file is not found
    if(!request.file){
        return response.status(404).json("file not found");
        // return response.status(404).json({msg:"file not found"});
    }
    // else return url of file
    const imageUrl=`${url}/file/${request.file.filename}`;
    response.status(200).json(imageUrl);
    // return response.status(200).json(imageUrl);
}

export const getImage=async (request,response)=>{
    try {
        const file=await gfs.files.findOne({filename:request.params.filename});
        // for downloading the image,it returns a stream
        const readStream=gridfsBucket.openDownloadStream(file._id);
        // pass it to pipe to make it in readable format
        readStream.pipe(response);
    } catch (error) {
        return response.status(500).json({msg:error.message});
    }
}