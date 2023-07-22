import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import MyImage from './ProgVerse.png';

const MainContainer = styled(Box)`
  display: flex;
  flex-direction: column; 
  padding: 20px;
  background-color: #e8f8f5;
  min-height: 100vh; 

  @media (min-width: 768px) {
    flex-direction: row;
    min-height: 80vh;
  }
`;

const ContentSection = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

const LeftSection = styled(ContentSection)`
  @media (min-width: 768px) {
    order: 2;
  }
`;

const RightSection = styled(ContentSection)`
  @media (min-width: 768px) {
    order: 1;
  }
`;

const Image = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const Heading = styled(Typography)`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #1a535c;

  @media (min-width: 768px) {
    font-size: 100px;
  }
`;

const SubHeading = styled(Typography)`
  font-size: 30px;
  color: #1a535c;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    font-size: 50px;
  }
`;

const IconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const IconLink = styled('a')`
  color: #1a535c;
  text-decoration: none;
  &:hover {
    color: #2b7a78;
  }
`;

const LogoImage = styled('img')`
  width: 40%;
  height: auto;
  max-width: 200px;
  border-radius: 50%;

  @media (min-width: 768px) {
    max-width: 300px;
  }
`;

const Footer = styled(Box)`
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 10px;
  font-size: 18px;
`;

const ContactPage = () => {
  const temp="<Programmer/Verse>";
  return (
    <>
      <MainContainer>
        <LeftSection>
        <LogoImage src={MyImage} alt="ProgVerse Logo" />
          <Heading>Contact-Us</Heading>
          <SubHeading>{temp}</SubHeading>
          <IconWrapper>
            <IconLink href="mailto:sophiyabhi101@gmail.com">
              <EmailIcon fontSize="large" />
            </IconLink>
            <IconLink href="https://github.com/A1080" target="_blank">
              <GitHubIcon fontSize="large" />
            </IconLink>
            <IconLink href="https://www.instagram.com/abhisheksophiya?r=nametag" target="_blank">
              <InstagramIcon fontSize="large" />
            </IconLink>
          </IconWrapper>
        </LeftSection>
        <RightSection>
        <Image src="https://cdn.pixabay.com/photo/2020/05/18/16/17/social-media-5187243_1280.png" alt="Contact" />
        </RightSection>
      </MainContainer>
      <Footer>
        Made with ❤️ Abhishek Sophiya
      </Footer>
    </>
  );
};

export default ContactPage;
