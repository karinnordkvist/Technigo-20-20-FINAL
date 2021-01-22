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
      <LinkWrapper>
        <InnerLinkWrapperLeft>
          <div>
            <NavButton to="/" location={currentLocation}>
              <NavImage src="./images/cb.png" />
            </NavButton>
          </div>
          <div>
            <NavButton
              to="/stories"
              activeStyle={{ fontStyle: 'italic', letterSpacing: '.4px' }}
              location={currentLocation}
            >
              Stories
            </NavButton>
          </div>
        </InnerLinkWrapperLeft>
        <InnerLinkWrapperRight>
          <div>
            <NavButton
              to="/food"
              activeStyle={{ fontStyle: 'italic', letterSpacing: '.4px' }}
              location={currentLocation}
            >
              Food
            </NavButton>
          </div>
          <div>
            <NavButton to="/stories" location={currentLocation}>
              Projects
            </NavButton>
          </div>
          <div>
            <NavButton
              to="/contact"
              activeStyle={{ fontStyle: 'italic', letterSpacing: '.4px' }}
              location={currentLocation}
            >
              Contact
            </NavButton>
          </div>
        </InnerLinkWrapperRight>
      </LinkWrapper>
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

const LinkWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InnerLinkWrapperLeft = styled.div`
  display: flex;

  div {
    width: 80px;
    margin-right: 20px;
    text-align: left;
  }
`;

const InnerLinkWrapperRight = styled(InnerLinkWrapperLeft)`
  display: flex;

  div {
    width: 80px;
    margin-left: 20px;
    margin-right: 0;
    text-align: right;
  }
`;

const NavImage = styled.img`
  width: 20px;
  filter: invert(1);
`;

const NavButton = styled(NavLink)`
  color: ${(props) => (props.location === '/' ? '#fff' : '#000')};
`;
