import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Fade from 'react-reveal/Fade';

import sanityClient from '../client.js';

import { Grid1, Grid2, Grid3, Grid4, Grid5, Grid6 } from '../components/Grids';
// Styling
import {
  InnerWrapper,
  BreadCrumbs,
  BackButton,
  FlexWrapperSpace,
  LoaderWrapper,
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
    .replaceAll('-', ' ')
    .replaceAll('ae', 'ä')
    .replaceAll('oe', 'ö');

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
          text2,
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
  }, [currentLocation, slug, dispatch]);

  if (!storyData) {
    return (
      <LoaderWrapper>
        <p>Loading...</p>
      </LoaderWrapper>
    );
  }
  return (
    <Fade>
      <StoryInnerWrapper>
        <FlexWrapperSpace>
          <BackButton onClick={history.goBack}>Tillbaka</BackButton>
          <BreadCrumbs>{formattedLocation}</BreadCrumbs>
        </FlexWrapperSpace>
        <MainImage src={storyData.main_image.url} />
        <StoryClient>{storyData.client}</StoryClient>
        <StoryTitle>{storyData.title}</StoryTitle>
        {storyData.secondary_byline && (
          <StoryByline>
            ----- projekt skapat med {storyData.secondary_byline}
          </StoryByline>
        )}
        <StoryIntro>{storyData.intro}</StoryIntro>

        <StoryTextWrapper>
          <StoryInfo>
            <li>Client:</li>
            <li style={{ fontStyle: 'italic', marginBottom: '10px' }}>
              {storyData.client}
            </li>
            <li>Team:</li>
            <li style={{ fontStyle: 'italic', marginBottom: '10px' }}>
              Caroline Borg {storyData.secondary_byline && ','}{' '}
              {storyData.secondary_byline}
            </li>
            <li>Tags:</li>
            <li style={{ fontStyle: 'italic', marginBottom: '10px' }}>
              {storyData.tags &&
                storyData.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
            </li>
          </StoryInfo>
          <div>
            {storyData.text2 &&
              storyData.text2.map((part) => {
                return part.children.map((textPart) => {
                  return (
                    <p style={{ marginBottom: '15px' }} key={textPart._key}>
                      {textPart.text}
                    </p>
                  );
                });
              })}
          </div>
        </StoryTextWrapper>

        {/* Image-grids */}
        <StoryGridWrapper>
          {storyData.grids &&
            storyData.grids.map((grid, index) => {
              if (grid.name === 'grid-1') {
                return <Grid1 image1={grid.images[0]} key={index} />;
              }
              if (grid.name === 'grid-2') {
                return (
                  <Grid2
                    image1={grid.images[0]}
                    image2={grid.images[1]}
                    key={index}
                  />
                );
              }
              if (grid.name === 'grid-3') {
                return (
                  <Grid3
                    image1={grid.images[0]}
                    image2={grid.images[1]}
                    key={index}
                  />
                );
              }
              if (grid.name === 'grid-4') {
                return (
                  <Grid4
                    image1={grid.images[0]}
                    image2={grid.images[1]}
                    image3={grid.images[2]}
                    key={index}
                  />
                );
              }
              if (grid.name === 'grid-5') {
                return (
                  <Grid5
                    image1={grid.images[0]}
                    image2={grid.images[1]}
                    key={index}
                  />
                );
              }
              if (grid.name === 'grid-6') {
                return (
                  <Grid6 image1={grid.images[0]} text={grid.text} key={index} />
                );
              }
              return null;
            })}
        </StoryGridWrapper>
        <FlexWrapperSpace style={{ marginTop: '50px' }}>
          <BackButton onClick={history.goBack}>Tillbaka</BackButton>
          <BreadCrumbs>{formattedLocation}</BreadCrumbs>
        </FlexWrapperSpace>
      </StoryInnerWrapper>
    </Fade>
  );
};

// ----------------------------------------------------------------

const StoryInnerWrapper = styled(InnerWrapper)`
  margin: 150px auto 50px auto;

  @media (max-width: 900px) {
    margin: 150px auto 0 auto;
  }
`;

const MainImage = styled.img`
  margin: 30px 0 50px;
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  object-position: 50% 50%;
`;

const StoryClient = styled.p`
  font-size: 16px;
  text-align: center;
  text-transform: uppercase;
`;

const StoryTitle = styled.h1`
  font-size: 36px;
  font-weight: 300;
  text-align: center;
  margin: 20px auto 30px;
`;

const StoryIntro = styled.p`
  font-size: 24px;
  font-style: italic;
  font-weight: 300;
  line-height: 1.6;
  margin: 40px auto;
  text-align: center;
  max-width: 90%;

  @media (max-width: 900px) {
    max-width: 95%;
  }
`;

const StoryByline = styled.p`
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
  font-size: 16px;
  line-height: 1.6;
`;

const StoryGridWrapper = styled.div``;
