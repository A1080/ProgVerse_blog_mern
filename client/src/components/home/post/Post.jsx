import { Box, Card, CardContent, Typography, styled } from "@mui/material";
import { addElipsis } from "../../../utils/common-utils";

const Details = styled(Typography)`
  font-size: 14px;
  word-break: break-word;
`;

const AuthorName = styled(Typography)`
  color: #878787;
  font-style: italic;
`;

const Post = ({ post }) => {
    const url = post.picture ? post.picture : 'https://plus.unsplash.com/premium_photo-1685086785636-2a1a0e5b591f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80';
  return (
    <Card sx={{ height: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <img
          src={url}
          alt="blog_image"
          style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
        />
        <CardContent>
          <Typography variant="subtitle1">{post.categories}</Typography>
          <Typography variant="h6">{addElipsis(post.title, 20)}</Typography>
          <AuthorName variant="subtitle2">{post.username}</AuthorName>
          <Details variant="body1">{addElipsis(post.description, 70)}</Details>
        </CardContent>
      </Box>
    </Card>
  );
};

export default Post;
