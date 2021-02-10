import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import sanityClient from '../client.js';
import Fade from 'react-reveal/Fade';

// Styling
import {
  InnerWrapper,
  BreadCrumbs,
  FlexWrapper,
  LoaderWrapper,
} from '../assets/GlobalStyles';

// Reducers
import { location } from '../reducers/location';

// ----------------------------------------------------------------

export const Projects = () => {
  const currentLocation = useLocation();
  const dispatch = useDispatch();
  const [projects, setProjects] = useState(null);
  const categoryRaw = useSelector((store) => store.location.project_category);
  const category = JSON.stringify(
    useSelector((store) => store.location.project_category)
  );

  useEffect(() => {
    dispatch(location.actions.setLocation(currentLocation.pathname));
    if (!categoryRaw) {
      sanityClient
        .fetch(
          `*[_type == 'project']| order(_createdAt desc){
                  title,
                  client, 
                  slug, 
                  "thumbnail":thumbnail.asset->{url, tags, title}, 
                  date, 
                  intro, 
                  "images": images[] {"image":asset->{tags, url}}.image, 
                  layout,
                tags }`
        )
        .then((data) => setProjects(data))
        .catch(console.error);
    } else {
      sanityClient
        .fetch(
          `*[_type == 'project' && ${category} in tags]| order(_createdAt desc){
                  title, 
                  slug, 
                  client,
                  "thumbnail":thumbnail.asset->{url, tags, title}, 
                  date, 
                  intro, 
                  "images": images[] {"image":asset->{tags, url}}.image, 
                  layout,
                tags }`
        )
        .then((data) => setProjects(data))
        .catch(console.error);
    }
  }, [category, currentLocation.pathname, dispatch, categoryRaw]);

  const onChangeHandler = (category) => {
    dispatch(location.actions.setProjectCategory(category));
  };

  if (!projects) {
    return (
      <LoaderWrapper>
        <p>Loading...</p>
      </LoaderWrapper>
    );
  }

  return (
    <Fade>
      <StoriesInnerWrapper>
        {/* Responsive sorting menu */}
        <FlexWrapper>
          <ResponsiveCategories>
            <p>Sortera på:</p>
            <CategorySelect
              onChange={(event) => onChangeHandler(event.target.value)}
            >
              <option value="">Alla</option>
              <option value="fotografi">Fotografi</option>
              <option value="PR">PR</option>
              <option value="styling">Styling</option>
              <option value="editorial">Editorial</option>
              <option value="motion">Rörligt</option>
            </CategorySelect>
          </ResponsiveCategories>
        </FlexWrapper>

        {/* Breadcrumbs + back-button */}
        <FlexWrapper>
          <BreadCrumbs>
            Visar: {categoryRaw === '' ? 'Alla projekt' : categoryRaw}
          </BreadCrumbs>
        </FlexWrapper>

        {/* Listed projects */}
        {projects &&
          projects.map((project) => {
            return (
              <StoryWrapper key={project.title}>
                <StoryThumbnail src={project.thumbnail.url} />
                <StoryTextWrapper>
                  <Link
                    to={'/projects/' + project.slug.current}
                    key={project.slug.current}
                  >
                    <StoryTitle>{project.title}</StoryTitle>
                    {project.client && (
                      <StoryCategory>för {project.client}</StoryCategory>
                    )}
                  </Link>
                  <StoryIntro>{project.intro}</StoryIntro>
                  <StoryLink to={'/projects/' + project.slug.current}>
                    Läs mer &#187;
                  </StoryLink>
                  <StoryCategory>
                    {project.tags &&
                      project.tags.map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                      ))}
                  </StoryCategory>
                </StoryTextWrapper>
              </StoryWrapper>
            );
          })}
      </StoriesInnerWrapper>
    </Fade>
  );
};

const StoriesInnerWrapper = styled(InnerWrapper)`
  padding: 100px 0;

  @media (max-width: 900px) {
    padding: 50px 0 0 0;
  }
`;

const StoryWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 0;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const ResponsiveCategories = styled.div`
  display: none;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 20px;

  p {
    width: 33%;
    font-size: 13px;
    line-height: 1.6;
    padding: 5px 0;
  }

  @media (max-width: 900px) {
    display: flex;
  }
`;

const CategorySelect = styled.select`
  font-family: 'Fraunces';
  width: 100%;
  padding: 10px;
  background: none;
`;

// Single story ----------------
const StoryCategory = styled.p`
  font-style: italic;
  font-size: 14px;
  margin-top: 5px;
`;

const Tag = styled.span`
  font-size: 12px;
  padding: 2px 5px;
  background: #e6e3dc;
  margin-right: 3px;
`;

const StoryThumbnail = styled.img`
  width: 240px;
  height: 220px;
  object-fit: cover;
  max-width: 100%;

  @media (max-width: 900px) {
    width: 100%;
    height: 350px;
  }
`;

const StoryTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;

  @media (max-width: 900px) {
    margin: 10px auto 50px auto;
    text-align: center;
  }
`;

const StoryTitle = styled.h2`
  font-weight: 300;

  @media (max-width: 900px) {
    margin-top: 20px;
  }
`;

const StoryIntro = styled.p`
  margin: 15px auto 5px auto;
  font-size: 14px;
  line-height: 1.5;
`;
const StoryLink = styled(Link)`
  margin: 5px 0 10px 0;
  font-size: 14px;
  font-style: italic;
  letter-spacing: 0.4px;
`;
