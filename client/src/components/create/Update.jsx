import { useState, useEffect, useContext } from 'react';
import { Box, FormControl, styled, InputBase, Button, TextareaAutosize } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useLocation, useNavigate,useParams } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';

const Container=styled(Box)(({theme})=>({
    margin:'50px 100px',
    [theme.breakpoints.down('md')]:{
        margin:0
    }
}));

const Image = styled('img')`
  width: 180vh;
  height: 70vh;
  object-fit: cover;
`;

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  border: 1px solid #ccc;
  padding: 6px;
  border-radius: 4px;
  margin: 0 30px;
`;

const TextareaStyled = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 40px;
  font-size: 20px;
  border: none;
  padding: 10px;
  &:focus-visible {
    outline: none;
  }
`;

const AddImageContainer = styled('div')`
  display: flex;
  align-items: center;
  font-size: 15px;
`;

const AddImageText = styled('span')`
  margin-left: 5px;
  font-weight: bold;
  margin-right: 15px;
`;

const initialPost = {
  title: '',
  description: '',
  picture: '',
  username: '',
  categories: '',
  createdDate: new Date(),
};

const Update = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState('');
  const { account } = useContext(DataContext) || {};
  const location=useLocation();
  const navigate=useNavigate();
  const {id}=useParams(); //to get the post id
  const url = post.picture?post.picture:'https://cdn.pixabay.com/photo/2022/12/04/06/32/programmer-7633812_1280.jpg';

    // fetching previous data
    useEffect(()=>{
        const fetchData=async()=>{
            let response=await API.getPostById(id);
            if(response.isSuccess){
                setPost(response.data);
            }
        }
        fetchData();
    },[])

  // original
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append('name', file.name);
        data.append('file', file);

        // API CALL
        const response = await API.uploadFile(data);
        post.picture = response.data;
      }
    };
    getImage();
    post.categories=location.search?.split('=')[1] || 'All';
    post.username=account.username;
  }, [file]);
  
  
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  // this function call the api to update the post
  // if update post successful navigate it to detailview
  const updateBlogPost=async ()=>{
    let response=await API.updatePost(post); //api call for updatePost
    if(response.isSuccess){
      navigate(`/details/${id}`);
    }
  }
  return (
    <Container>
      <Image src={url} alt="post" />

      <StyledFormControl>
        <label htmlFor="fileInput">
          <AddImageContainer>
            <AddCircleIcon fontSize="large" color="action" />
            <AddImageText>Add Image</AddImageText>
          </AddImageContainer>
        </label>
        <input type="file" id="fileInput" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />

        {/* add value to show the previous title */}
        <InputTextField onChange={(e) => handleChange(e)} value={post.title} name='title' placeholder="Title" />
        <Button variant="contained" onClick={()=>updateBlogPost()}>Update</Button>
      </StyledFormControl>

{/* add value to display the previous description which is fetch above */}
      <TextareaStyled minRows={5} placeholder="Code Learn Inspire..." onChange={handleChange} name="description" value={post.description}/>
    </Container>
  );
};

export default Update;