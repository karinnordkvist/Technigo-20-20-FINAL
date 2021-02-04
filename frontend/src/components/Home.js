import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Data
import sanityClient from '../client.js';

// Styling
import { InnerWrapper } from '../assets/GlobalStyles';

// Reducers
import { location } from '../reducers/location';

// ----------------------------------------------------------------

export const Home = () => {
  const ref = useRef();
  const currentLocation = useLocation();
  const dispatch = useDispatch();
  // const [offsetTop, setOffsetTop] = useState();
  const [projects, setProjects] = useState([]);
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    // Send current location to reducer
    dispatch(location.actions.setLocation(currentLocation.pathname));

    // Fetch all projects
    sanityClient
      .fetch(`*[_type == 'project']`)
      .then((data) => setProjects(data))
      .catch(console.error);

    // Fetch all home-data
    sanityClient
      .fetch(
        `*[_type == 'home']{ "hero_image":hero_image.asset->{url, tags, title, byline}, hero_title, hero_text, intro_text}`
      )
      .then((data) => setHomeData(data[1]))
      .catch(console.error);

    // Fetch most recently uploaded project/recipe
    sanityClient
      .fetch(
        `*[_type == 'recipe' || _type == 'project']| order(_createdAt desc)`
      )
      .then((data) => console.log(data[0]));
  }, []);

  // useEffect(() => {
  //   setOffsetTop(ref.current.offsetTop);
  // }, [offsetTop]);

  if (!homeData) {
    return (
      <LoaderWrapper>
        <p>Loading...</p>
      </LoaderWrapper>
    );
  }
  return (
    <HomeOuterWrapper>
      <HeroBG img={homeData.hero_image.url}></HeroBG>
      <HeroWrapper ref={ref}>
        <HeroTitle>{homeData.hero_title}</HeroTitle>
        <HeroSubtitle>{homeData.hero_text}</HeroSubtitle>
      </HeroWrapper>

      <SectionWrapper>
        {/* <AboutImage src="" /> */}
        <AboutHeader>About</AboutHeader>
        <AboutText>{homeData.intro_text}</AboutText>
      </SectionWrapper>
      <SectionWrapper></SectionWrapper>
    </HomeOuterWrapper>
  );
};

const LoaderWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const HomeOuterWrapper = styled.div``;

const HeroWrapper = styled.div`
  height: 100vh;
`;

const HeroTitle = styled.h1`
  font-family: 'Pearl';
  text-align: center;
  font-size: 100px;
  color: #fff;
  font-weight: normal;
  padding-top: 300px;

  @media (max-width: 900px) {
    font-size: 60px;
    margin-bottom: 20px;
    margin: 10px 20px;
  }

  @media (max-width: 400px) {
    font-size: 40px;
  }
`;

const HeroSubtitle = styled.h3`
  font-family: 'Pearl';
  text-align: center;
  color: #fff;
  font-weight: normal;
  margin: 10px 20px;

  @media (max-width: 900px) {
    font-size: 18px;
    line-height: 2;
  }
`;

const HeroBG = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: center;
  z-index: -1;
`;

const SectionWrapper = styled(InnerWrapper)`
  padding: 50px auto;
`;

const AboutImage = styled.img`
  width: 30vw;
  margin: 50px auto;
`;

const AboutHeader = styled.h2`
  font-family: 'Pearl';
  font-weight: normal;
  font-size: 20px;
  text-align: center;
  text-transform: uppercase;
`;

const AboutText = styled.p`
  margin-top: 30px;
  font-family: 'Fraunces';
  font-size: 20px;
  line-height: 1.6;
  text-align: center;
  font-style: italic;
`;
