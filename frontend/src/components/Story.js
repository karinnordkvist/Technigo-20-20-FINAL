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
        `*[slug.current == "${slug}"]{_id, title, slug, "main_image":main_image.asset->{url, tags, title}, "thumbnail":thumbnail.asset->{url, tags, title}, creator, secondary_byline, intro, "images": images[] {"image":asset->{tags, url}}.image, quote, layout }`
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
      {storyData.images &&
        storyData.images.map((image, index) => (
          <StoryImage src={image.url} key={index} />
        ))}
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
