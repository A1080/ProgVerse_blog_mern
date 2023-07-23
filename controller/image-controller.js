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

    const statusCode = response.statusCode; 
    const popupMessage = statusCode === 200 ? 'Image uploaded successfully!' : 'Error uploading image!';
    const popupStyle = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999;
      padding: 10px;
      border-radius: 5px;
      background-color: ${statusCode === 200 ? 'green' : 'red'};
      color: white;
      font-weight: bold;
    `;
  
    // Create a popup element
    const popup = document.createElement('div');
    popup.textContent = popupMessage;
    popup.style.cssText = popupStyle;
  
    // Append the popup to the body
    document.body.appendChild(popup);
  
    // Remove the popup after a few seconds (adjust the time according to your preference)
    setTimeout(() => {
      document.body.removeChild(popup);
    }, 3000); 

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