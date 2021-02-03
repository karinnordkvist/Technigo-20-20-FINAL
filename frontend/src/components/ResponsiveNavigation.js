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

export const ResponsiveNavigation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [projectsActive, setProjectsActive] = useState(false);
  const [storiesActive, setStoriesActive] = useState(false);
  const currentLocation = useSelector((store) => store.location.location);
  const tags = ['all', 'photography', 'pr', 'styling', 'editorial', 'motion'];
  const [stories, setStories] = useState([]);

  const [subMenu, setSubMenu] = useState(false);

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
        {/* Home ------------------------------------ */}
        <LinkWrapper location={currentLocation}>
          <NavLink to="/">
            <NavImage src={process.env.PUBLIC_URL + '/images/cb.png'} />
          </NavLink>
        </LinkWrapper>
        <LinkWrapper location={currentLocation}>
          <NavButton
            location={currentLocation}
            onClick={() => setSubMenu(!subMenu)}
          >
            Meny
          </NavButton>
        </LinkWrapper>
      </LinksOuterWrapper>

      {/* SUBMENU ---------------------------------------------------------------- */}
      {subMenu && (
        <SubLinksOuterWrapper>
          {/* Selected Stories ------------------------------------ */}
          <LinkWrapper location={currentLocation}>
            <NavLink
              to="/stories"
              activeStyle={{ fontStyle: 'italic', letterSpacing: '.3px' }}
              onClick={() => setSubMenu(false)}
            >
              Stories
            </NavLink>
          </LinkWrapper>

          {/* Food ------------------------------------ */}
          <LinkWrapper location={currentLocation}>
            <NavLink
              to="/food"
              activeStyle={{ fontStyle: 'italic', letterSpacing: '.3px' }}
              onClick={() => setSubMenu(false)}
            >
              Mat
            </NavLink>
          </LinkWrapper>

          {/* Projects ------------------------------------ */}
          <LinkWrapper location={currentLocation}>
            <NavLink
              to="/projects"
              activeStyle={{ fontStyle: 'italic', letterSpacing: '.3px' }}
              onClick={() => projectsClickHandler('')}
              onClick={() => setSubMenu(false)}
            >
              Projekt
            </NavLink>
          </LinkWrapper>

          {/* Contact ------------------------------------ */}
          <LinkWrapper location={currentLocation}>
            <NavLink
              to="/contact"
              activeStyle={{ fontStyle: 'italic', letterSpacing: '.3px' }}
              onClick={() => setSubMenu(false)}
            >
              Kontakt
            </NavLink>
          </LinkWrapper>
        </SubLinksOuterWrapper>
      )}
    </NavInnerWrapper>
  );
};

// ----------------------------------------------------------------
const NavInnerWrapper = styled(InnerWrapper)`
  margin: 35px auto 45px auto;
  z-index: 5;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;

  @media (min-width: 900px) {
    display: none;
  }
`;

const LinksOuterWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SubLinksOuterWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  text-align: right;
  justify-content: space-between;
`;

const NavImage = styled.img`
  width: 20px;
  filter: invert(1);
`;

const NavButton = styled.button`
  border: none;
  background: none;
  color: ${(props) => (props.location === '/' ? '#fff' : '#000')};

  font-family: 'Fraunces';
  cursor: pointer;

  &:hover {
    font-style: italic;
    letter-spacing: 0.4px;
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
  font-size: 13px;
`;

const DropdownButton = styled.button`
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
