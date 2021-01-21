import React from 'react';
import styled from 'styled-components/macro';
import { NavLink, Link } from 'react-router-dom';

// Styling
import { InnerWrapper } from '../assets/GlobalStyles';

// ----------------------------------------------------------------

export const Navigation = () => {
  return (
    <NavInnerWrapper>
      <LinkWrapper>
        <InnerLinkWrapperLeft>
          <div>
            <NavLink to="/">
              <NavImage src="./images/cb.png" />
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/stories"
              activeStyle={{ fontStyle: 'italic', letterSpacing: '.4px' }}
            >
              Stories
            </NavLink>
          </div>
        </InnerLinkWrapperLeft>
        <InnerLinkWrapperRight>
          <div>
            <NavLink
              to="/food"
              activeStyle={{ fontStyle: 'italic', letterSpacing: '.4px' }}
            >
              Food
            </NavLink>
          </div>
          <div>
            <a>Projects</a>
          </div>
          <div>
            <NavLink
              to="/contact"
              activeStyle={{ fontStyle: 'italic', letterSpacing: '.4px' }}
            >
              Contact
            </NavLink>
          </div>
        </InnerLinkWrapperRight>
      </LinkWrapper>
    </NavInnerWrapper>
  );
};

// ----------------------------------------------------------------
const NavInnerWrapper = styled(InnerWrapper)`
  z-index: 5;
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
    text-align: right;
  }
`;

const NavImage = styled.img`
  width: 20px;
`;
