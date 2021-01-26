import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import sanityClient from '../client.js';

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
  const currentLocation = useLocation();
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [storyData, setStoryData] = useState(null);

  // For back-button & breadcrumbs
  const history = useHistory();
  const formattedLocation = currentLocation.pathname
    .substring(1)
    .replaceAll('/', ' · ');

  // Fetch story data
  useEffect(() => {
    dispatch(location.actions.setLocation(currentLocation.pathname));

    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{
          _id, 
          title, 
          slug,
          tags, 
          "main_image":main_image.asset->{url, tags, title}, 
          "thumbnail":thumbnail.asset->{url, tags, title}, 
          creator, 
          secondary_byline, 
          intro, 
          "grids": grids[]{"images":images[]{"image":asset->{tags, url}}.image, text, grid_type},
          "images": images[] {"image":asset->{tags, url}}.image, 
          quote, 
         }`
      )
      .then((data) => setStoryData(data[0]))
      .catch(console.error);
  }, []);

  console.log(storyData);

  if (!storyData) {
    return (
      <InnerWrapper>
        <p>Loading...</p>
      </InnerWrapper>
    );
  }
  return (
    <StoryInnerWrapper>
      <FlexWrapper>
        <BackButton onClick={history.goBack}>Tillbaka</BackButton>
        <BreadCrumbs>{formattedLocation}</BreadCrumbs>
      </FlexWrapper>
      <MainImage src={storyData.main_image.url} />
      <StoryTitle>{storyData.title}</StoryTitle>
      <StoryIntro>{storyData.intro}</StoryIntro>
      {storyData.grids &&
        storyData.grids.map((grid, index) => {
          console.log(grid.grid_type);
          return (
            <GridWrapper key={index}>
              <GridImageWrapper gridType={grid.grid_type}>
                {grid.images.map((image, index) => (
                  <StoryImage src={image.url} key={index} />
                ))}
              </GridImageWrapper>
              {grid.text && <GridText>{grid.text}</GridText>}
            </GridWrapper>
          );
        })}

      {/* {storyData.images &&z
        storyData.images.map((image, index) => (
          <StoryImage src={image.url} key={index} />
        ))} */}
    </StoryInnerWrapper>
  );
};

// ----------------------------------------------------------------

const StoryInnerWrapper = styled(InnerWrapper)`
  margin: 100px auto;
`;

const MainImage = styled.img`
  margin-top: 50px;
  max-width: 100%;
`;

const StoryImage = styled.img`
  max-width: 100%;
`;

const StoryTitle = styled.h1`
  font-family: 'Fraunces';
  font-weight: 300;
  text-align: center;
  margin: 50px auto 30px;
`;

const StoryIntro = styled.p`
  font-family: 'Fraunces';
  text-align: center;
  margin-bottom: 50px;
`;

const GridWrapper = styled.div``;

const GridImageWrapper = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.gridType == 'grid-2' ? '1fr 1fr' : '1fr'};
  gap: 20px;
  img {
  }
`;

const GridText = styled.p`
  font-size: 36px;
  font-family: 'Fraunces';
  text-align: center;
  padding: 50px 0;
  font-style: italic;
`;
