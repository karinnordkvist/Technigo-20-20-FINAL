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
    'PR',
    'styling',
    'editorial',
    'rörligt',
  ];
  const [stories, setStories] = useState([
    { title: 'Alla Stories', slug: { current: 'all' } },
  ]);

  // Send category choice to redux for listed projects-page, navigate to projects
  const projectsClickHandler = (value) => {
    dispatch(location.actions.setProjectCategory(value));
    history.push('/projects');
  };

  // Navigate to selected story
  const storiesClickHandler = (slug) => {
    if (slug === 'all') {
      history.push('/stories');
    } else {
      history.push('/projects/' + slug);
    }
  };

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'project' && selected_story == true]| order(_createdAt desc){
              title, slug, client }`
      )
      .then((data) => setStories([...stories, ...data]))
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
          {/* <DropdownLinkWrapper
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
            <Dropdown
              showing={storiesActive}
              style={{ transform: 'translateX(-28px)' }}
              location={currentLocation}
            >
              {stories &&
                stories.map((story, index) => {
                  return (
                    <StoriesDropdownButton
                      location={currentLocation}
                      onClick={() => storiesClickHandler(story.slug.current)}
                      key={index}
                    >
                      {story.title}
                      {story.client && (
                        <NavClient>för {story.client}</NavClient>
                      )}
                    </StoriesDropdownButton>
                  );
                })}
            </Dropdown>
          </DropdownLinkWrapper> */}
        </Left>

        <Right>
          {/* Food ------------------------------------ */}
          {/* <LinkWrapper location={currentLocation}>
            <NavLink
              to="/food"
              activeStyle={{ fontStyle: 'italic', letterSpacing: '.3px' }}
              style={{ marginRight: '20px' }}
            >
              Recept
            </NavLink>
          </LinkWrapper> */}

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
              Selected work
            </NavLink>
            {/* <Dropdown
              showing={projectsActive}
              style={{ transform: 'translateX(35px)' }}
              location={currentLocation}
            >
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
            </Dropdown> */}
          </DropdownLinkWrapper>

          {/* Contact ------------------------------------ */}
          <LinkWrapper location={currentLocation}>
            <NavLink
              to="/contact"
              activeStyle={{ fontStyle: 'italic', letterSpacing: '.3px' }}
            >
              Contact
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

const NavImage = styled.img`
  width: 20px;
  filter: invert(1);
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

// Left side of the menu
const Left = styled.div`
  display: flex;
  align-items: center;

  ${LinkWrapper} {
    width: 80px;
    margin-right: 20px;
    text-align: left;
  }
`;

// Right side of the menu
const Right = styled(Left)`
  display: flex;

  ${LinkWrapper} {
    width: 130px;
    margin-left: 20px;
    margin-right: 0;
    text-align: right;
  }
`;

const Dropdown = styled.div`
  display: ${(props) => (props.showing ? 'flex' : 'none')};
  position: absolute;
  z-index: 5;
  flex-direction: column;
  align-items: flex-start;
  background: ${(props) =>
    props.location === '/' ? 'none' : 'rgba(252, 251, 248, 1)'};
  padding: ${(props) =>
    props.location === '/' ? '10px 30px 20px 30px' : '20px 30px'};
  box-shadow: ${(props) =>
    props.location === '/' ? 'none' : '2px 15px 15px rgba(0, 0, 0, 0.1)'};
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
  width: 150px;
  color: ${(props) => (props.location === '/' ? '#fff' : '#000')};
  font-size: 16px;
  border: none;
  background: none;
  text-align: left;
  padding: 7px 0;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    font-style: italic;
    letter-spacing: '.3px';
  }
`;

const StoriesDropdownButton = styled(DropdownButton)`
  margin-left: 0;
  width: 300px;
`;

const DownArrow = styled.span`
  font-size: 6px;
  margin-left: 2px;
`;
