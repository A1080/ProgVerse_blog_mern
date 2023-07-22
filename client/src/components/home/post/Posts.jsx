import { useEffect, useState } from 'react';
import { API } from '../../../service/api';
import { Box, Container, styled } from '@mui/material';
import { Grid } from '@mui/material';
import { useSearchParams,Link } from 'react-router-dom';
import Post from './Post';

const BoxStyled = styled(Box)`
  color: #878787;
  margin: 30px 80px;
  font-size: 18px;
`;

const Posts = () => {
  const [posts, setPosts] = useState([]);

    // to categories the post according to category
    const [searchParams]=useSearchParams();
    const category=searchParams.get('category');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // api call
        // let response = await API.getAllPosts();
        // for category filtering we have to pass params
        let response = await API.getAllPosts({category:category || ''});
        if (response.isSuccess) {
          // store the response data in setPosts
          setPosts(response.data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchData();
//   }, []);
// for filtering
  }, [category]);

  return (
    <Container>
      <Grid container spacing={2} sx={{ marginTop: '30px' }}>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Grid item key={post.id} lg={3} sm={4} xs={12}>
                <Link to={`details/${post._id}`} style={{textDecoration:'none', color:'inherit'}}>
                    <Post post={post} />
              </Link>
            </Grid>
          ))
        ) : (
          <BoxStyled>No Posts are available to display</BoxStyled>
        )}
      </Grid>
    </Container>
  );
};

export default Posts;
