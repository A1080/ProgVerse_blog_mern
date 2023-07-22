import { Box, Typography, styled } from '@mui/material';

const Image = styled(Box)`
  background: url(https://cdn.pixabay.com/photo/2020/04/19/14/23/developer-5063843_1280.jpg);
  width: 100%;
  height: 80vh;
  display: flex;
  object-fit: cover;
  flex-direction: column;
  align-items: flex-start; 
  justify-content: center; 
  padding-left: 30px;
`;


const Title = styled(Typography)`
  font-size: 120px;
  font-weight: bold; 
  color: #ffffff; 
  margin-bottom: 30px;
`;

const Subtitle = styled(Typography)`
  font-size: 30px; 
  color: #ffffff;
`;

const Banner = () => {
  return (
    <Image>
      <Title variant="h1">BLOG</Title>
      <Subtitle variant="h2">Contribute to the Community</Subtitle>
    </Image>
  );
};

export default Banner;
