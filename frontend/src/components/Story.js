import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useParams, useHistory, useLocation } from 'react-router-dom';

import sanityClient from '../client.js';

// Styling
import {
  InnerWrapper,
  BreadCrumbs,
  BackButton,
  FlexWrapper,
} from '../assets/GlobalStyles';

// ----------------------------------------------------------------

export const Story = () => {
  const { slug } = useParams();
  const [storyData, setStoryData] = useState(null);

  // For back-button & breadcrumbs
  const history = useHistory();
  const location = useLocation();
  const formattedLocation = location.pathname
    .substring(1)
    .replaceAll('/', ' · ');

  // Fetch story data
  useEffect(() => {
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
    <InnerWrapper>
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
    </InnerWrapper>
  );
};

// ----------------------------------------------------------------

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
