import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import sanityClient from '../client.js';

// Reducer
import { location } from '../reducers/location';

// Styling
import { InnerWrapper } from '../assets/GlobalStyles';

// ----------------------------------------------------------------

export const Navigation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [projectsActive, setProjectsActive] = useState(false);
  const [storiesActive, setStoriesActive] = useState(false);
  const currentLocation = useSelector((store) => store.location.location);
  const tags = [
    'alla projekt',
    'fotografi',
    'pr',
    'styling',
    'editorial',
    'rörligt',
  ];
  const [stories, setStories] = useState([]);

  // Send category choice to redux for listed projects-page, navigate to projects
  const projectsClickHandler = (value) => {
    dispatch(location.actions.setProjectCategory(value));
    history.push('/projects');
  };

  // Navigate to selected story
  const storiesClickHandler = (slug) => {
    history.push('/projects/' + slug);
  };

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'project' && selected_story == true]| order(_createdAt desc){
              title, slug, client }`
      )
      .then((data) => setStories(data))
      .catch(console.error);
  }, []);

  return (
    <NavInnerWrapper>
      <LinksOuterWrapper>
        <Left>
          {/* Home ------------------------------------ */}
          <LinkWrapper location={currentLocation}>
            <NavLink to="/">
              <NavImage src={process.env.PUBLIC_URL + '/images/cb.png'} />
            </NavLink>
          </LinkWrapper>

          {/* Selected Stories ------------------------------------ */}
          <DropdownLinkWrapper
            location={currentLocation}
            onMouseEnter={() => setStoriesActive(true)}
            onMouseLeave={() => setStoriesActive(false)}
            style={{ width: '200px' }}
          >
            <NavLink
              to="/stories"
              activeStyle={{ fontStyle: 'italic', letterSpacing: '.3px' }}
            >
              Stories <DownArrow>▼</DownArrow>
            </NavLink>
            <Dropdown showing={storiesActive}>
              {stories &&
                stories.map((story, index) => {
                  return (
                    <StoriesDropdownButton
                      location={currentLocation}
                      onClick={() => storiesClickHandler(story.slug.current)}
                      key={index}
                    >
                      {story.title}
                      <NavClient>för {story.client}</NavClient>
                    </StoriesDropdownButton>
                  );
                })}
            </Dropdown>
          </DropdownLinkWrapper>
        </Left>

        <Right>
          {/* Food ------------------------------------ */}
          <LinkWrapper location={currentLocation}>
            <NavLink
              to="/food"
              activeStyle={{ fontStyle: 'italic', letterSpacing: '.3px' }}
              style={{ marginRight: '20px' }}
            >
              Mat
            </NavLink>
          </LinkWrapper>

          {/* Projects ------------------------------------ */}
          <DropdownLinkWrapper
            location={currentLocation}
            onMouseEnter={() => setProjectsActive(true)}
            onMouseLeave={() => setProjectsActive(false)}
          >
            <NavLink
              to="/projects"
              activeStyle={{ fontStyle: 'italic', letterSpacing: '.3px' }}
              onClick={() => projectsClickHandler('')}
            >
              Projekt <DownArrow>▼</DownArrow>
            </NavLink>
            <Dropdown showing={projectsActive}>
              {tags &&
                tags.map((tag, index) => {
                  return (
                    <DropdownButton
                      location={currentLocation}
                      onClick={() =>
                        projectsClickHandler(tag === 'alla projekt' ? '' : tag)
                      }
                      key={index}
                    >
                      {tag}
                    </DropdownButton>
                  );
                })}
            </Dropdown>
          </DropdownLinkWrapper>

          {/* Contact ------------------------------------ */}
          <LinkWrapper location={currentLocation}>
            <NavLink
              to="/contact"
              activeStyle={{ fontStyle: 'italic', letterSpacing: '.3px' }}
            >
              Kontakt
            </NavLink>
          </LinkWrapper>
        </Right>
      </LinksOuterWrapper>
    </NavInnerWrapper>
  );
};

// ----------------------------------------------------------------
const NavInnerWrapper = styled(InnerWrapper)`
  z-index: 5;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;

  @media (max-width: 900px) {
    display: none;
  }
`;

const LinksOuterWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Left side of the menu
const Left = styled.div`
  display: flex;
  align-items: center;

  div {
    width: 80px;
    margin-right: 20px;
    text-align: left;
  }
`;

const NavImage = styled.img`
  width: 20px;
  filter: invert(1);
`;

// Right side of the menu
const Right = styled(Left)`
  display: flex;

  div {
    width: 130px;
    margin-left: 20px;
    margin-right: 0;
    text-align: right;
  }
`;

// Separate div to be able to use props for navlinks
const LinkWrapper = styled.div`
  img {
    filter: ${(props) => (props.location === '/' ? 'invert(1)' : 'invert(0)')};
  }
  a {
    color: ${(props) => (props.location === '/' ? '#fff' : '#000')};
  }
`;

const Dropdown = styled.div`
  display: ${(props) => (props.showing ? 'flex' : 'none')};
  position: absolute;
  z-index: 5;
  padding-top: 10px;
  flex-direction: column;
  align-items: flex-start;
`;

const NavClient = styled.span`
  display: block;
  font-style: italic;
  text-transform: capitalize;
  font-size: 14px;
  margin: 2px 0 2px;
`;

const DropdownLinkWrapper = styled(LinkWrapper)`
  display: relative;
`;

const DropdownButton = styled.button`
  width: 250px;
  font-family: 'Fraunces';
  color: ${(props) => (props.location === '/' ? '#fff' : '#000')};
  font-size: 16px;
  border: none;
  background: none;
  margin-left: 46px;
  text-align: left;
  padding: 4px 0;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    font-style: italic;
    letter-spacing: '.3px';
  }
`;

const StoriesDropdownButton = styled(DropdownButton)`
  margin-left: 0;
  width: 400px;
`;

const DownArrow = styled.span`
  font-size: 6px;
  margin-left: 2px;
`;
