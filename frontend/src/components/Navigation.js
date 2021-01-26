import React, { useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Reducer
import { location } from '../reducers/location';

// Styling
import { InnerWrapper } from '../assets/GlobalStyles';

// ----------------------------------------------------------------

export const Navigation = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const [projectsActive, setProjectsActive] = useState(false);
  const [storiesActive, setStoriesActive] = useState(false);
  const currentLocation = useSelector((store) => store.location.location);

  const onClickHandler = (value) => {
    dispatch(location.actions.setProjectCategory(value));
    history.push('/projects');
  };
  return (
    <NavInnerWrapper>
      <LinksOuterWrapper>
        <Left>
          <LinkWrapper location={currentLocation}>
            <NavButton to="/">
              <NavImage src={process.env.PUBLIC_URL + '/images/cb.png'} />
            </NavButton>
          </LinkWrapper>

          <DropdownLinkWrapper
            location={currentLocation}
            onMouseEnter={() => setStoriesActive(true)}
            onMouseLeave={() => setStoriesActive(false)}
          >
            <NavButton
              to="/stories"
              activeStyle={{ fontStyle: 'italic', letterSpacing: '.4px' }}
            >
              Stories <DownArrow>▼</DownArrow>
            </NavButton>
            <Dropdown showing={storiesActive}>
              <StoriesDropdownButton
                location={currentLocation}
                onClick={() => onClickHandler('photography')}
              >
                Photography
              </StoriesDropdownButton>
              <StoriesDropdownButton
                location={currentLocation}
                onClick={() => onClickHandler('pr')}
              >
                PR
              </StoriesDropdownButton>
              <StoriesDropdownButton
                location={currentLocation}
                onClick={() => onClickHandler('styling')}
              >
                Styling
              </StoriesDropdownButton>
              <StoriesDropdownButton
                location={currentLocation}
                onClick={() => onClickHandler('editorial')}
              >
                Editorial
              </StoriesDropdownButton>
              <StoriesDropdownButton
                location={currentLocation}
                onClick={() => onClickHandler('motion')}
              >
                Motion
              </StoriesDropdownButton>
            </Dropdown>
          </DropdownLinkWrapper>
        </Left>

        <Right>
          <LinkWrapper location={currentLocation}>
            <NavButton
              to="/food"
              activeStyle={{ fontStyle: 'italic', letterSpacing: '.4px' }}
            >
              Food
            </NavButton>
          </LinkWrapper>

          <DropdownLinkWrapper
            location={currentLocation}
            onMouseEnter={() => setProjectsActive(true)}
            onMouseLeave={() => setProjectsActive(false)}
          >
            <NavButton
              to="/projects"
              activeStyle={{ fontStyle: 'italic', letterSpacing: '.4px' }}
              onClick={() => onClickHandler('')}
            >
              Projects <DownArrow>▼</DownArrow>
            </NavButton>
            <Dropdown showing={projectsActive}>
              <DropdownButton
                location={currentLocation}
                onClick={() => onClickHandler('')}
              >
                All
              </DropdownButton>
              <DropdownButton
                location={currentLocation}
                onClick={() => onClickHandler('photography')}
              >
                Photography
              </DropdownButton>
              <DropdownButton
                location={currentLocation}
                onClick={() => onClickHandler('pr')}
              >
                PR
              </DropdownButton>
              <DropdownButton
                location={currentLocation}
                onClick={() => onClickHandler('styling')}
              >
                Styling
              </DropdownButton>
              <DropdownButton
                location={currentLocation}
                onClick={() => onClickHandler('editorial')}
              >
                Editorial
              </DropdownButton>
              <DropdownButton
                location={currentLocation}
                onClick={() => onClickHandler('motion')}
              >
                Motion
              </DropdownButton>
            </Dropdown>
          </DropdownLinkWrapper>

          <LinkWrapper location={currentLocation}>
            <NavButton
              to="/contact"
              activeStyle={{ fontStyle: 'italic', letterSpacing: '.4px' }}
            >
              Contact
            </NavButton>
          </LinkWrapper>
        </Right>
      </LinksOuterWrapper>
    </NavInnerWrapper>
  );
};

// ----------------------------------------------------------------
const NavInnerWrapper = styled(InnerWrapper)`
  z-index: 5;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
`;

const LinksOuterWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;

  div {
    width: 80px;
    margin-right: 20px;
    text-align: left;
  }
`;
const NavButton = styled(NavLink)``;

const DropdownNavButton = styled(NavButton)`
  margin-left: 0;
  text-align: left;
  padding: 3px 0;
`;

const Right = styled(Left)`
  display: flex;

  div {
    width: 100px;
    margin-left: 20px;
    margin-right: 0;
    text-align: right;
  }

  ${DropdownNavButton} {
    text-align: left;
    margin-left: 10px;
  }
`;

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

const DropdownLinkWrapper = styled(LinkWrapper)`
  display: relative;
`;

const NavImage = styled.img`
  width: 20px;
  filter: invert(1);
`;

const DownArrow = styled.span`
  font-size: 6px;
  margin-left: 2px;
`;

const DropdownButton = styled.button`
  font-family: 'Fraunces';
  color: ${(props) => (props.location === '/' ? '#fff' : '#000')};
  font-size: 16px;
  border: none;
  background: none;
  margin-left: 10px;
  text-align: left;
  padding: 3px 0;
  cursor: pointer;

  &:hover {
    font-style: italic;
    letter-spacing: '.4px';
  }
`;

const StoriesDropdownButton = styled(DropdownButton)`
  margin-left: 0;
`;
