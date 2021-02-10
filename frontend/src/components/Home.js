import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import Fade from 'react-reveal/Fade';

// Components
import { CategoryImage } from '../index';

// Data
import sanityClient from '../client.js';

// Styling
import { InnerWrapper, LoaderWrapper } from '../assets/GlobalStyles';

// Reducers
import { location } from '../reducers/location';

// ----------------------------------------------------------------

export const Home = () => {
  const currentLocation = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [homeData, setHomeData] = useState(null);
  const [latest, setLatest] = useState([]);

  const onCategoryClickHandler = (category) => {
    dispatch(location.actions.setProjectCategory(category));
    history.push('/projects');
  };

  const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

  useEffect(() => {
    // Send current location to reducer
    dispatch(location.actions.setLocation(currentLocation.pathname));

    // Fetch all home-data
    sanityClient
      .fetch(
        `*[_type == 'home']{
          "hero_image":hero_image.asset->{url, tags, title, byline}, 
          hero_title, 
          hero_text, 
          intro_text,
          "intro_image": intro_image.asset->{url, tags, title, byline},
          "category_images": category_images[] {"image":asset->{tags, url, title,byline}}.image,
          category_titles,
          "single_category_image": single_category_image.asset->{url, tags, title, byline},
          single_category_title,
          work_title,
          work_text
        }`
      )
      .then((data) => setHomeData(data[1]))
      .catch(console.error);

    // Fetch most recently uploaded project/recipe
    sanityClient
      .fetch(
        `*[_type == 'recipe' || _type == 'project']| order(_createdAt desc){
          "thumbnail":thumbnail.asset->{url, tags, title}, 
          _type, 
          title,
          client, 
          category,
          slug,
          intro,
          secondary_byline,
        }`
      )
      .then((data) => setLatest(data));
  }, [dispatch, currentLocation.pathname]);

  if (!homeData) {
    return (
      <LoaderWrapper>
        <p>Loading...</p>
      </LoaderWrapper>
    );
  }

  return (
    <Fade>
      <HomeOuterWrapper>
        <HeroBG img={homeData.hero_image.url}></HeroBG>

        {/* Hero section */}
        <HeroWrapper>
          <HeroTitle>{homeData.hero_title}</HeroTitle>
          <HeroSubtitle>{homeData.hero_text}</HeroSubtitle>
        </HeroWrapper>

        {/* About section */}
        <AboutWrapper>
          <ImageWrapper>
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={transition}
              src={homeData.intro_image.url}
            />
          </ImageWrapper>
          <HomePearlHeader>Om Caroline</HomePearlHeader>
          <AboutText>{homeData.intro_text}</AboutText>
        </AboutWrapper>

        {/* Triple categories - full width */}
        <CategoryWrapper>
          {homeData.category_images &&
            homeData.category_images.map((image, index) => {
              const titles = homeData.category_titles;
              return (
                <CategoryImage
                  key={index}
                  url={image.url}
                  title={titles[index]}
                  onCategoryClickHandler={onCategoryClickHandler}
                  height="40vh"
                  fontSize="24px"
                />
              );
            })}
        </CategoryWrapper>

        {/* Latest recipe/project section */}
        <LatestOuterWrapper>
          <HomePearlHeader style={{ marginBottom: '50px' }}>
            Aktuellt
          </HomePearlHeader>
          {latest &&
            latest.map((project, index) => {
              if (index < 5) {
                return (
                  <LatestWrapper style={{ background: '#e6e3dc' }} key={index}>
                    {project.thumbnail.url && (
                      <img
                        src={project.thumbnail.url}
                        alt="Project thumbnail"
                        onClick={() =>
                          history.push(
                            project._type === 'recipe'
                              ? `/food/${project.slug.current}`
                              : `/projects/${project.slug.current}`
                          )
                        }
                      />
                    )}
                    <div>
                      <Category>
                        {project._type === 'recipe' ? 'Recept' : 'Projekt'} /{' '}
                        {project.category}
                      </Category>
                      {project.client && <Client>för {project.client}</Client>}
                      <Link
                        to={
                          project._type === 'recipe'
                            ? `/food/${project.slug.current}`
                            : `/projects/${project.slug.current}`
                        }
                      >
                        <h2>{project.title}</h2>
                      </Link>
                      <Link
                        to={
                          project._type === 'recipe'
                            ? `/food/${project.slug.current}`
                            : `/projects/${project.slug.current}`
                        }
                      >
                        <p>Läs mer &#187;</p>
                      </Link>
                    </div>
                  </LatestWrapper>
                );
              }
              return null;
            })}
        </LatestOuterWrapper>

        {/* Single category - full width */}
        <CategoryWrapper style={{ gridTemplateColumns: '1fr' }}>
          {homeData.single_category_image && (
            <CategoryImage
              url={homeData.single_category_image.url}
              title={homeData.single_category_title}
              onCategoryClickHandler={onCategoryClickHandler}
              height="80vh"
              fontSize="42px"
            />
          )}
        </CategoryWrapper>

        {/* Work with me- section */}
        <WorkWrapper>
          <WorkPearlHeader>{homeData.work_title}</WorkPearlHeader>
          <AboutText>{homeData.work_text}</AboutText>
          <WorkLink to="/contact">Kontakta mig &#187;</WorkLink>
        </WorkWrapper>
      </HomeOuterWrapper>
    </Fade>
  );
};

const HomeOuterWrapper = styled(motion.div)``;

const HeroWrapper = styled(motion.div)`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SectionWrapper = styled(InnerWrapper)`
  padding: 200px auto;
  margin: 150px auto;

  @media (max-width: 900px) {
    margin: 100px auto;
  }
`;

const AboutWrapper = styled(SectionWrapper)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    width: 20vw;
    margin-bottom: 50px;
    text-align: center;
  }
`;

const CategoryWrapper = styled.div`
  margin: 150px auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    margin: 100px auto;
  }
`;

const LatestOuterWrapper = styled(SectionWrapper)`
  margin: 150px auto;
  @media (max-width: 900px) {
    margin: 100px auto;
  }
`;

const LatestWrapper = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 30px auto;

  div {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 60%;
  }

  img {
    width: 40%;
    height: 300px;
    object-fit: cover;
    cursor: pointer;
  }

  h2 {
    font-weight: normal;
    font-size: 20px;
    text-transform: uppercase;
    max-width: 80%;
    margin: 20px auto 20px auto;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    img {
      width: 80%;
      margin-top: 50px;
    }
    div {
      margin-bottom: 50px;
    }
  }
`;

const WorkWrapper = styled(SectionWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Category = styled.p`
  font-style: italic;
  margin-bottom: 5px;

  @media (max-width: 900px) {
    margin-top: 20px;
  }
`;

const Client = styled.p`
  font-style: italic;
  margin-bottom: 5px;
  font-size: 12px;
`;

const HeroTitle = styled.h1`
  font-family: 'Pearl';
  text-align: center;
  font-size: 100px;
  color: #fff;
  font-weight: normal;

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
  margin-top: 10px;

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

const HomePearlHeader = styled.h2`
  font-family: 'Pearl';
  font-weight: normal;
  font-size: 20px;
  text-align: center;
  text-transform: uppercase;
`;

const WorkPearlHeader = styled(HomePearlHeader)`
  font-size: 38px;

  @media (max-width: 900px) {
    font-size: 30px;
  }
`;

const AboutText = styled.p`
  margin-top: 30px;
  font-size: 20px;
  line-height: 1.6;
  text-align: center;
  font-style: italic;
`;

const ImageWrapper = styled.div`
  width: 300px;
  height: 370px;
  overflow: hidden;
  margin-bottom: 50px;

  img {
    width: 100%;
  }
`;

const WorkLink = styled(Link)`
  text-align: center;
  margin-top: 40px;
`;
