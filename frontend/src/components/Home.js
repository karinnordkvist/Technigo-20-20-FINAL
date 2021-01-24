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
        `*[_type == 'home']{ "hero_image":hero_image.asset->{url, tags, title, byline}, hero_title, hero_text}`
      )
      .then((data) => setHomeData(data[0]))
      .catch(console.error);

    sanityClient
      .fetch(
        `*[_type == 'recipe' || _type == 'project']| order(_createdAt desc)`
      )
      .then((data) => console.log(data[0]));
  }, []);

  // console.log(projects);
  // console.log(homeData);

  // useEffect(() => {
  //   setOffsetTop(ref.current.offsetTop);
  // }, [offsetTop]);

  if (!homeData) {
    return (
      <InnerWrapper>
        <p>Loading...</p>
      </InnerWrapper>
    );
  }
  return (
    <HomeOuterWrapper>
      <HeroBG img={homeData.hero_image.url}></HeroBG>
      <HeroWrapper ref={ref}>
        <HeroTitle>{homeData.hero_title}</HeroTitle>
        <HeroSubtitle>{homeData.hero_text}</HeroSubtitle>
      </HeroWrapper>

      <InnerWrapper>
        <AboutImage src="" />
        <AboutHeader>About</AboutHeader>
        <AboutText>
          “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictum
          consectetur ultrices turpis lectus. Amet commodo curabitur rutrum
          proin pulvinar rhoncus semper donec. Sit integer morbi vestibulum
          felis. Mi neque eget diam augue in.“
        </AboutText>
      </InnerWrapper>
    </HomeOuterWrapper>
  );
};

const HomeOuterWrapper = styled.div``;

const HeroTitle = styled.h1`
  font-family: 'Pearl';
  text-align: center;
  font-size: 100px;
  color: #fff;
  font-weight: normal;
  padding-top: 260px;
`;

const HeroSubtitle = styled.h3`
  font-family: 'Pearl';
  text-align: center;
  color: #fff;
  font-weight: normal;
  margin-top: 10px;
`;

const HeroBG = styled.div`
  width: 100%;
  height: 800px;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: center;
  z-index: -1;
`;

const HeroWrapper = styled.div`
  /* background: red; */
  height: 750px;
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
`;
