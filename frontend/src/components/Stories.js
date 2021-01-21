import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import sanityClient from '../client.js';

// Styling
import { InnerWrapper } from '../assets/GlobalStyles';

// ----------------------------------------------------------------

export const Stories = () => {
  const [storyData, setStoryData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'project']{title, slug, "thumbnail":thumbnail.asset->{url, tags, title}, date, intro, "images": images[] {"image":asset->{tags, url}}.image, layout }`
      )
      .then((data) => setStoryData(data))
      .catch(console.error);
  }, []);

  return (
    <InnerWrapper>
      <StoriesIntro>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictum
        consectetur ultrices turpis lectus. Amet commodo curabitur rutrum proin
        pulvinar rhoncus semper donec. Sit integer morbi vestibulum felis. Mi
        neque eget diam augue in.
      </StoriesIntro>
      {storyData &&
        storyData.map((project) => {
          return (
            <ProjectWrapper key={project.title}>
              <ProjectThumbnail src={project.thumbnail.url} />
              <ProjectTextWrapper>
                <Link
                  to={'/stories/' + project.slug.current}
                  key={project.slug.current}
                >
                  <StoryCategory>Story:</StoryCategory>
                  <ProjectTitle>{project.title}</ProjectTitle>
                </Link>
                <ProjectIntro>{project.intro}</ProjectIntro>
                <ProjectLink to="/stories">Link to the project</ProjectLink>
              </ProjectTextWrapper>
            </ProjectWrapper>
          );
        })}
    </InnerWrapper>
  );
};

const StoriesIntro = styled.p`
  font-family: 'Fraunces';
  font-style: italic;
  font-size: 30px;
  font-weight: 300;
  line-height: 1.6;
  margin-bottom: 50px;
`;

const ProjectWrapper = styled.div`
  display: flex;
  margin: 20px 0;
`;

const StoryCategory = styled.p`
  font-family: 'Fraunces';
  font-style: italic;
  font-size: 14px;
`;

const ProjectThumbnail = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  max-width: 100%;
`;

const ProjectTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
`;

const ProjectTitle = styled.h2`
  font-family: 'Fraunces';
  font-weight: 300;
  margin-top: 10px;
`;

const ProjectIntro = styled.p`
  font-family: 'Fraunces';
  margin-top: 15px;
`;

const ProjectLink = styled(Link)``;
