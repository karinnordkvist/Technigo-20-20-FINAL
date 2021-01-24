import React from 'react';
import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Styling
import { InnerWrapper } from '../assets/GlobalStyles';

// ----------------------------------------------------------------

export const Navigation = () => {
  const currentLocation = useSelector((store) => store.location.location);
  console.log(currentLocation);

  return (
    <NavInnerWrapper>
      <LinksOuterWrapper>
        <Left>
          <LinkWrapper location={currentLocation}>
            <NavButton to="/">
              <NavImage src="./images/cb.png" />
            </NavButton>
          </LinkWrapper>
          <LinkWrapper location={currentLocation}>
            <NavButton
              to="/stories"
              activeStyle={{ fontStyle: 'italic', letterSpacing: '.4px' }}
            >
              Stories
            </NavButton>
          </LinkWrapper>
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
          <LinkWrapper location={currentLocation}>
            <NavButton to="/stories">Projects</NavButton>
          </LinkWrapper>
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

const Right = styled(Left)`
  display: flex;

  div {
    width: 80px;
    margin-left: 20px;
    margin-right: 0;
    text-align: right;
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

const NavImage = styled.img`
  width: 20px;
  filter: invert(1);
`;

const NavButton = styled(NavLink)`
  color: ${(props) => (props.location === '/' ? '#fff' : '#000')};
`;
