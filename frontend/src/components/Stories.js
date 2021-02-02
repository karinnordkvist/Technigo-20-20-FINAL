import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import sanityClient from '../client.js';

import { ThumbnailGallery } from './ThumbnailGallery';

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
        `*[_type == 'project' && selected_story == true]|order(_createdAt desc){
          title,
          client, 
          slug,
          tags, 
          "thumbnail":thumbnail.asset->{url, tags, title}, 
          date, 
          intro, 
          "grids": grids[]{"images":images[]{"image":asset->{tags, url}}.image},
          layout }`
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
              <ThumbnailGallery project={project} />
              <StoryTextWrapper>
                <Link
                  to={'/stories/' + project.slug.current}
                  key={project.slug.current}
                >
                  <StoryTitle>{project.title}</StoryTitle>
                </Link>
                <StoryClient>För {project.client}</StoryClient>
                <StoryIntro>{project.intro}</StoryIntro>
                <StoryTagsWrapper>
                  {project.tags &&
                    project.tags.map((tag, index) => (
                      <Tag key={index}>{tag}</Tag>
                    ))}
                </StoryTagsWrapper>
                <StoryLink to="/stories">Read more..</StoryLink>
              </StoryTextWrapper>
            </StoryWrapper>
          );
        })}
    </StoriesInnerWrapper>
  );
};

// ----------------------------------------------------------------

const StoriesInnerWrapper = styled(InnerWrapper)`
  padding: 100px 0;
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
  align-items: center;
  margin: 20px 0;
  padding-bottom: 20px;

  &:not(:last-child) {
    border-bottom: 1px solid #e6e3dc;
  }
`;

// Single story ----------------
const StoryTextWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  flex-direction: column;
  margin-left: 50px;
  text-align: center;
`;

const StoryTitle = styled.h2`
  font-family: 'Fraunces';
  font-size: 36px;
  font-weight: 300;
  margin: 5px auto;
`;

const StoryClient = styled.p`
  font-family: 'Fraunces';
  font-style: italic;
  text-transform: uppercase;
  font-size: 14px;
  margin-top: 5px;
`;

const StoryIntro = styled.p`
  font-family: 'Fraunces';
  margin-top: 15px;
`;

const StoryLink = styled(Link)`
  margin-top: 20px;
  font-size: 14px;
  font-style: italic;
  letter-spacing: 0.4px;
`;

const StoryTagsWrapper = styled.div`
  margin: 20px auto 10px auto;
`;

const Tag = styled.span`
  font-family: 'Fraunces';
  font-style: italic;
  font-size: 12px;
  padding: 2px 5px;
  background: #e6e3dc;
  margin-right: 3px;
`;
