import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import sanityClient from '../client.js';

// Styling
import { InnerWrapper } from '../assets/GlobalStyles';

// ----------------------------------------------------------------

export const Stories = () => {
  const [storyData, setStoryData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'project']{title, "thumbnail":thumbnail.asset->{url, tags, title}, date, intro, "images": images[] {"image":asset->{tags, url}}.image, layout }`
      )
      .then((data) => setStoryData(data))
      .catch(console.error);
  }, []);

  console.log(storyData);
  return (
    <InnerWrapper>
      {storyData &&
        storyData.map((project) => {
          return (
            <ProjectWrapper key={project.title}>
              <ProjectThumbnail src={project.thumbnail.url} />
              <ProjectTextWrapper>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectIntro>{project.intro}</ProjectIntro>
              </ProjectTextWrapper>
            </ProjectWrapper>
          );
        })}
    </InnerWrapper>
  );
};

const ProjectThumbnail = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  max-width: 100%;
`;

const ProjectWrapper = styled.div`
  display: flex;
`;
const ProjectTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
`;

const ProjectTitle = styled.h2`
  font-family: 'Pearl';
  margin-top: 10px;
`;

const ProjectIntro = styled.p`
  font-family: 'Fraunces';
  margin-top: 15px;
`;

// {project.images.map((image) => (
//     <ProjectImage src={image.url} key={image.url} />
//   ))}
