import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import sanityClient from '../client.js';

// Styling
import { InnerWrapper } from '../assets/GlobalStyles';

// Reducers
import { location } from '../reducers/location';

// ----------------------------------------------------------------

export const Stories = () => {
  const currentLocation = useLocation();
  const dispatch = useDispatch();
  const [storyData, setStoryData] = useState(null);

  useEffect(() => {
    dispatch(location.actions.setLocation(currentLocation.pathname));
    sanityClient
      .fetch(
        `*[_type == 'project' && selected_story == true]|order(_createdAt desc){title, slug, "thumbnail":thumbnail.asset->{url, tags, title}, date, intro, "images": images[] {"image":asset->{tags, url}}.image, layout }`
      )
      .then((data) => setStoryData(data))
      .catch(console.error);
  }, []);

  return (
    <StoriesInnerWrapper>
      <StoriesIntro>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictum
        consectetur ultrices turpis lectus. Amet commodo curabitur rutrum proin
        pulvinar rhoncus semper donec. Sit integer morbi vestibulum felis.
      </StoriesIntro>
      {storyData &&
        storyData.map((project) => {
          return (
            <StoryWrapper key={project.title}>
              <StoryThumbnail src={project.thumbnail.url} />
              <StoryTextWrapper>
                <StoryCategory>Story:</StoryCategory>
                <Link
                  to={'/stories/' + project.slug.current}
                  key={project.slug.current}
                >
                  <StoryTitle>{project.title}</StoryTitle>
                </Link>
                <StoryIntro>{project.intro}</StoryIntro>
                <StoryLink to="/stories">Link to the project</StoryLink>
              </StoryTextWrapper>
            </StoryWrapper>
          );
        })}
    </StoriesInnerWrapper>
  );
};

const StoriesInnerWrapper = styled(InnerWrapper)`
  padding: 50px 0;
`;

const StoriesIntro = styled.p`
  font-family: 'Fraunces';
  font-style: italic;
  font-size: 30px;
  font-weight: 300;
  line-height: 1.6;
  margin-bottom: 50px;
`;

const StoryWrapper = styled.div`
  display: flex;
  margin: 20px 0;
`;

// Single story ----------------
const StoryCategory = styled.p`
  font-family: 'Fraunces';
  font-style: italic;
  font-size: 14px;
`;

const StoryThumbnail = styled.img`
  width: 220px;
  height: 150px;
  object-fit: cover;
  max-width: 100%;
`;

const StoryTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
`;

const StoryTitle = styled.h2`
  font-family: 'Fraunces';
  font-weight: 300;
  margin-top: 5px;
`;

const StoryIntro = styled.p`
  font-family: 'Fraunces';
  margin-top: 15px;
`;

const StoryLink = styled(Link)`
  margin-top: 20px;
  font-size: 14px;
`;
