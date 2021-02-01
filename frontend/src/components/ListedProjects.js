import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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

export const ListedProjects = () => {
  const currentLocation = useLocation();
  const dispatch = useDispatch();
  const [projects, setProjects] = useState(null);
  const categoryRaw = useSelector((store) => store.location.project_category);
  const category = JSON.stringify(
    useSelector((store) => store.location.project_category)
  );

  useEffect(() => {
    // dispatch(location.actions.setProjectCategory(''));
    dispatch(location.actions.setLocation(currentLocation.pathname));
    if (!categoryRaw) {
      sanityClient
        .fetch(
          `*[_type == 'project']| order(_createdAt desc){
                  title, 
                  slug, 
                  "thumbnail":thumbnail.asset->{url, tags, title}, 
                  date, 
                  intro, 
                  "images": images[] {"image":asset->{tags, url}}.image, 
                  layout }`
        )
        .then((data) => setProjects(data))
        .catch(console.error);
    } else {
      sanityClient
        .fetch(
          `*[_type == 'project' && ${category} in tags]| order(_createdAt desc){
                  title, 
                  slug, 
                  "thumbnail":thumbnail.asset->{url, tags, title}, 
                  date, 
                  intro, 
                  "images": images[] {"image":asset->{tags, url}}.image, 
                  layout }`
        )
        .then((data) => setProjects(data))
        .catch(console.error);
    }
  }, [category]);

  return (
    <StoriesInnerWrapper>
      <FlexWrapper>
        <BreadCrumbs>
          Showing: {categoryRaw === '' ? 'All projects' : categoryRaw}
        </BreadCrumbs>
        <BackButton>Tillbaka</BackButton>
      </FlexWrapper>
      {projects &&
        projects.map((project) => {
          return (
            <StoryWrapper key={project.title}>
              <StoryThumbnail src={project.thumbnail.url} />
              <StoryTextWrapper>
                <StoryCategory>Story:</StoryCategory>
                <Link
                  to={'/projects/' + project.slug.current}
                  key={project.slug.current}
                >
                  <StoryTitle>{project.title}</StoryTitle>
                </Link>
                <StoryIntro>{project.intro}</StoryIntro>
              </StoryTextWrapper>
            </StoryWrapper>
          );
        })}
    </StoriesInnerWrapper>
  );
};

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
  font-size: 14px;
  line-height: 1.5;
`;

const StoryLink = styled(Link)`
  margin-top: 20px;
  font-size: 14px;
`;
