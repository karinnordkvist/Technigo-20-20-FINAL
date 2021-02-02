import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import sanityClient from '../client.js';

import { Grid_1, Grid_2, Grid_3, Grid_4, Grid_5, Grid_6 } from './Grids';
// Styling
import {
  InnerWrapper,
  BreadCrumbs,
  BackButton,
  FlexWrapper,
} from '../assets/GlobalStyles';

// Reducers
import { location } from '../reducers/location';

// ----------------------------------------------------------------

export const Story = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const currentLocation = useLocation();
  const [storyData, setStoryData] = useState(null);

  // For back-button & breadcrumbs
  const history = useHistory();
  const formattedLocation = currentLocation.pathname
    .substring(1)
    .replaceAll('/', ' · ')
    .replaceAll('-', ' ');

  // Fetch story data
  useEffect(() => {
    dispatch(location.actions.setLocation(currentLocation.pathname));

    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{
          _id, 
          title,
          client, 
          slug,
          tags,
          text, 
          "main_image":main_image.asset->{url, tags, title}, 
          "thumbnail":thumbnail.asset->{url, tags, title}, 
          creator, 
          secondary_byline, 
          intro, 
          "grids": grids[]{"images":images[]{"image":asset->{tags, url}}.image, text, name},
          "images": images[] {"image":asset->{tags, url}}.image, 
          quote, 
         }`
      )
      .then((data) => setStoryData(data[0]))
      .catch(console.error);
  }, [currentLocation]);

  console.log(storyData);

  if (!storyData) {
    return (
      <StoryInnerWrapper>
        <Loader>Loading...</Loader>
      </StoryInnerWrapper>
    );
  }
  return (
    <StoryInnerWrapper>
      <FlexWrapper>
        <BackButton onClick={history.goBack}>Tillbaka</BackButton>
        <BreadCrumbs>{formattedLocation}</BreadCrumbs>
      </FlexWrapper>
      <MainImage src={storyData.main_image.url} />
      <StoryClient>{storyData.client}</StoryClient>
      <StoryTitle>{storyData.title}</StoryTitle>
      <StoryByline>
        ----- projekt skapat med {storyData.secondary_byline}
      </StoryByline>
      <StoryIntro>{storyData.intro}</StoryIntro>

      <StoryTextWrapper>
        <StoryInfo>
          <li>Client:</li>
          <li style={{ fontStyle: 'italic', marginBottom: '10px' }}>
            {storyData.client}
          </li>
          <li>Team:</li>
          <li style={{ fontStyle: 'italic', marginBottom: '10px' }}>
            Caroline Borg, {storyData.secondary_byline}
          </li>
          <li>Tags:</li>
          <li style={{ fontStyle: 'italic', marginBottom: '10px' }}>
            {storyData.tags &&
              storyData.tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)}
          </li>
        </StoryInfo>
        <StoryMainText>{storyData.text}</StoryMainText>
      </StoryTextWrapper>

      {/* Image-grids */}
      <StoryGridWrapper>
        {storyData.grids &&
          storyData.grids.map((grid, index) => {
            if (grid.name === 'grid-1') {
              return <Grid_1 image1={grid.images[0].url} key={index} />;
            }
            if (grid.name === 'grid-2') {
              return (
                <Grid_2
                  image1={grid.images[0].url}
                  image2={grid.images[1].url}
                  key={index}
                />
              );
            }
            if (grid.name === 'grid-3') {
              return (
                <Grid_3
                  image1={grid.images[0].url}
                  image2={grid.images[1].url}
                  key={index}
                />
              );
            }
            if (grid.name === 'grid-4') {
              return (
                <Grid_4
                  image1={grid.images[0].url}
                  image2={grid.images[1].url}
                  image3={grid.images[2].url}
                  key={index}
                />
              );
            }
            if (grid.name === 'grid-5') {
              return (
                <Grid_5
                  image1={grid.images[0].url}
                  image2={grid.images[1].url}
                  key={index}
                />
              );
            }
            if (grid.name === 'grid-6') {
              return (
                <Grid_6
                  image1={grid.images[0].url}
                  text={grid.text}
                  key={index}
                />
              );
            }
          })}
      </StoryGridWrapper>
    </StoryInnerWrapper>
  );
};

// ----------------------------------------------------------------

const StoryInnerWrapper = styled(InnerWrapper)`
  margin: 150px auto;

  @media (max-width: 900px) {
    margin: 150px auto 0 auto;
  }
`;

const Loader = styled.p`
  font-family: 'Pearl';
  text-align: center;
  padding: 300px auto;
`;

const MainImage = styled.img`
  margin: 30px 0 50px;
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  object-position: 50% 50%;
`;

const StoryClient = styled.p`
  font-family: 'Fraunces';
  font-size: 16px;
  text-align: center;
  text-transform: uppercase;
`;

const StoryTitle = styled.h1`
  font-family: 'Fraunces';
  font-size: 36px;
  font-weight: 300;
  text-align: center;
  margin: 20px auto 30px;
`;

const StoryIntro = styled.p`
  font-family: 'Fraunces';
  font-size: 24px;
  font-style: italic;
  font-weight: 300;
  line-height: 1.6;
  margin: 40px auto;
  text-align: center;
  max-width: 70%;

  @media (max-width: 900px) {
    max-width: 95%;
  }
`;

const StoryByline = styled.p`
  font-family: 'Fraunces';
  font-size: 16px;
  text-align: center;
  font-style: italic;
`;

const StoryTextWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 30px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const StoryInfo = styled.ul`
  list-style: none;
  font-family: 'Fraunces';
  font-size: 16px;

  li {
    width: 20vw;
  }

  @media (max-width: 900px) {
    text-align: center;
    margin: 0 auto 20px auto;

    li {
      width: 100%;
    }
  }
`;

const Tag = styled.span`
  &:not(:last-child)::after {
    content: ', ';
  }
`;

const StoryMainText = styled.p`
  font-family: 'Fraunces';
  font-size: 16px;
  line-height: 1.6;
`;

const StoryGridWrapper = styled.div``;
