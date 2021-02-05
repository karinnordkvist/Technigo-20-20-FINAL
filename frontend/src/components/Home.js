import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Components
import { CategoryImage } from './CategoryImage';

// Data
import sanityClient from '../client.js';

// Styling
import { InnerWrapper } from '../assets/GlobalStyles';

// Reducers
import { location } from '../reducers/location';

// ----------------------------------------------------------------

export const Home = () => {
  const currentLocation = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const ref = useRef();
  const [projects, setProjects] = useState([]);
  const [homeData, setHomeData] = useState(null);
  const [latest, setLatest] = useState([]);

  const onCategoryClickHandler = (category) => {
    dispatch(location.actions.setProjectCategory(category));
    history.push('/projects');
  };

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
        `*[_type == 'home']{
          "hero_image":hero_image.asset->{url, tags, title, byline}, 
          hero_title, 
          hero_text, 
          intro_text,
          "category_images": category_images[] {"image":asset->{tags, url, title,byline}}.image,
          category_titles,
          "single_category_image": single_category_image.asset->{url, tags, title, byline},
          single_category_title
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
      .then((data) => setLatest(data[0]));
  }, []);

  console.log(latest);

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

      {/* Hero section */}
      <HeroWrapper ref={ref}>
        <HeroTitle>{homeData.hero_title}</HeroTitle>
        <HeroSubtitle>{homeData.hero_text}</HeroSubtitle>
      </HeroWrapper>

      {/* About section */}
      <SectionWrapper>
        <HomePearlHeader>About</HomePearlHeader>
        <AboutText>{homeData.intro_text}</AboutText>
      </SectionWrapper>

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
              />
            );
          })}
      </CategoryWrapper>

      {/* Latest recipe/project section */}
      <SectionWrapper>
        <HomePearlHeader style={{ marginBottom: '50px' }}>
          Latest project
        </HomePearlHeader>

        {/* Latest project/recipe */}
        <LatestWrapper style={{ background: '#e6e3dc' }}>
          {latest.thumbnail && <img src={latest.thumbnail.url} />}
          <div>
            {latest.category && (
              <Category>
                {latest._type === 'recipe' ? 'Recept' : 'Projekt'} /{' '}
                {latest.category}
              </Category>
            )}
            {latest.slug.current && (
              <Link
                to={
                  latest._type === 'recipe'
                    ? `/food/${latest.slug.current}`
                    : `/project/${latest.slug.current}`
                }
              >
                <h2>{latest.title}</h2>
              </Link>
            )}
            {latest.client && <p>För {latest.client}</p>}
            {/* {latest.intro && <p>{latest.intro}</p>} */}
            {latest.slug.current && (
              <Link
                to={
                  latest._type === 'recipe'
                    ? `/food/${latest.slug.current}`
                    : `/project/${latest.slug.current}`
                }
              >
                <p>Läs mer &#187;</p>
              </Link>
            )}
          </div>
        </LatestWrapper>
      </SectionWrapper>

      {/* Single category - full width */}
      <CategoryWrapper style={{ gridTemplateColumns: '1fr' }}>
        {homeData.single_category_image && (
          <CategoryImage
            url={homeData.single_category_image.url}
            title={homeData.single_category_title}
            onCategoryClickHandler={onCategoryClickHandler}
          />
        )}
      </CategoryWrapper>
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

const SectionWrapper = styled(InnerWrapper)`
  padding: 200px auto;
  margin: 150px auto;
`;

const CategoryWrapper = styled.div`
  margin: 150px auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const LatestWrapper = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-family: 'Fraunces';

  div {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 60%;
  }

  img {
    width: 40%;
  }

  h2 {
    font-weight: normal;
    font-size: 20px;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    img {
      margin-top: 50px;
    }
    div {
      margin-bottom: 50px;
    }
  }
`;

const Category = styled.p`
  font-family: 'Fraunces';
  font-style: italic;
  margin-bottom: 5px;
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

const HomePearlHeader = styled.h2`
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
