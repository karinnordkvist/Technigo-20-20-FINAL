import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useParams, useHistory } from 'react-router-dom';

import sanityClient from '../client.js';

// Styling
import { InnerWrapper } from '../assets/GlobalStyles';

// ----------------------------------------------------------------

export const Story = () => {
  const { slug } = useParams();
  const [storyData, setStoryData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{title, slug, "thumbnail":thumbnail.asset->{url, tags, title}, creator, secondary_byline, intro, "images": images[] {"image":asset->{tags, url}}.image, quote, layout }`
      )
      .then((data) => setStoryData(data[0]))
      .catch(console.error);
  }, []);

  console.log(storyData);
  if (!storyData) {
    return <p>Loading...</p>;
  }
  return (
    <InnerWrapper>
      <BackButton onClick={history.goBack}>Tillbaka</BackButton>
      <p>{storyData.title}</p>
      <p>{storyData.intro}</p>
      {storyData.images &&
        storyData.images.map((image, index) => (
          <StoryImage src={image.url} key={index} />
        ))}
    </InnerWrapper>
  );
};

const StoryImage = styled.img`
  max-width: 100%;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Fraunces';

  &:hover {
    font-style: italic;
    letter-spacing: 0.4px;
  }
`;
