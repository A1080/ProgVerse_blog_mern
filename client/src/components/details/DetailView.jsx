import { useEffect,useState,useContext} from "react";
import { Box,Typography,styled } from "@mui/material";
import {Edit} from '@mui/icons-material';
import {Delete} from '@mui/icons-material';
import { useParams , Link,useNavigate} from "react-router-dom";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

import Comments from "./comments/Comments";

const Container=styled(Box)(({theme})=>({
    margin:'50px 100px',
    [theme.breakpoints.down('md')]:{
        margin:0
    }
}));

const Image=styled('img')({
    width:'100%',
    height:'60vh',
    // objectFit:'cover'
})

const Heading=styled(Typography)`
    font-size:40px;
    font-weight:600;
    Text-align:center;
    margin:30px;
    word-break:break-word;
`

const EditIcon=styled(Edit)`
    margin:5px;
    padding:5px;
    border:1px solid #878787;
    border-radius:10px;
`
const DeleteIcon=styled(Delete)`
    margin:5px;
    padding:5px;
    border:1px solid #878787;
    border-radius:10px;
`

const Author=styled(Typography)`
    color:#878787;
    display:flex;
    margin:20px 0;
`

const Description=styled(Typography)`
    word-break:break-word;
`
const DetailView=()=>{
    const [post,setPost]=useState({});
    const {id}=useParams();
    const {account}=useContext(DataContext);
    const navigate=useNavigate();
    const url=post.picture ? post.picture : 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';

    useEffect(()=>{
        const fetchData=async ()=>{
            let response=await API.getPostById(id);
            console.log(response.data);
            if(response.isSuccess){
                setPost(response.data);
            }
        }

        fetchData();
    },[])

    const deleteBlog=async ()=>{
        let response=await API.deletePost(post._id); //api call for deletePost
        if(response.isSuccess){
          navigate('/');
        }
      }
    return(
        <Container>
            <Image src={url} alt="blog"/>

            <Box style={{float:'right'}}>

                {
                    account.username===post.username && 
                    <>
                        <Link to={`/update/${post._id}`}><EditIcon/></Link>
                        <DeleteIcon onClick={()=>deleteBlog()}/>
                    </>
                }
            </Box>

            <Heading>{post.title}</Heading>
            <Author>
                <Typography>Author: <Box component="span" style={{fontWeight:600}}>{post.username}</Box></Typography>
                <Typography style={{marginLeft:'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>
            <Description>{post.description}</Description>
        <Comments post={post}/>
        </Container>

    )
}

export default DetailView;