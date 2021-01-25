import React, { useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Styling
import { InnerWrapper } from '../assets/GlobalStyles';

// ----------------------------------------------------------------

export const Navigation = () => {
  const ref = useRef();
  const [projectsActive, setProjectsActive] = useState(false);
  const [storiesActive, setStoriesActive] = useState(false);
  const currentLocation = useSelector((store) => store.location.location);
  console.log(ref);

  return (
    <NavInnerWrapper>
      <LinksOuterWrapper>
        <Left>
          <LinkWrapper location={currentLocation}>
            <NavButton to="/">
              <NavImage src="./images/cb.png" />
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
              <DropdownNavButton to="/stories">Projects</DropdownNavButton>
              <DropdownNavButton to="/stories">Projects</DropdownNavButton>
              <DropdownNavButton to="/stories">Projects</DropdownNavButton>
              <DropdownNavButton to="/stories">Projects</DropdownNavButton>
            </Dropdown>
          </DropdownLinkWrapper>
        </Left>

        <Right>
          <LinkWrapper location={currentLocation} ref={ref}>
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
            <NavButton to="/stories" ref={ref}>
              Projects <DownArrow>▼</DownArrow>
            </NavButton>
            <Dropdown showing={projectsActive}>
              <DropdownNavButton to="/stories">Projects</DropdownNavButton>
              <DropdownNavButton to="/stories">Projects</DropdownNavButton>
              <DropdownNavButton to="/stories">Projects</DropdownNavButton>
              <DropdownNavButton to="/stories">Projects</DropdownNavButton>
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
