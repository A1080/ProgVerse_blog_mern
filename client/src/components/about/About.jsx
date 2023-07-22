import React from 'react';
import { Box, Typography, styled } from '@mui/material';

const Container = styled(Box)`
  display: flex;
  padding: 40px;
`;

const LeftSection = styled(Box)`
  flex: 1;
`;

const RightSection = styled(Box)`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Image = styled('img')`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
`;

const Tagline = styled(Typography)`
  color: #007bff;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const DescriptionStyled=styled(Typography)`
    font-size:20px;
    font-family:
`
const About = () => {
  const description = `Welcome to our cutting-edge coding blog website, where innovation meets collaboration! Step into a world of limitless possibilities, where tech enthusiasts like you converge to explore diverse sections dedicated to every facet of coding mastery. Unleash your coding prowess as you dive into our carefully curated blogs covering a wide array of topics, from the latest frameworks and languages to insightful tutorials and best practices. But that's not all! Beyond just reading, this platform empowers you to connect, interact, and forge meaningful connections with fellow programmers from every corner of the globe. Share your brilliant solutions, exchange ideas, and join thought-provoking discussions that fuel your passion for coding. Together, we elevate our collective knowledge to new heights, fostering an environment where learning never ceases.`;
  const paragraphs = description.split('. ').filter((para) => para.trim() !== '');
  return (
    <Container>
      <LeftSection>
        <Tagline>Hello Peers, I am Abhishek Sophiya</Tagline>



        {paragraphs.map((para, index) => (
          <DescriptionStyled variant="body1"  key={index} style={{ fontSize: `${24 - index * 2}px`, margin: '10px 0',fontFamily: "'Calistoga', cursive" }}>
            {para}.
          </DescriptionStyled>
          ))}
      </LeftSection>
      <RightSection>
        <Image src="https://cdn.pixabay.com/photo/2017/05/09/13/33/laptop-2298286_1280.png" alt="Coding Image" />
      </RightSection>
    </Container>
  );
};

export default About;
