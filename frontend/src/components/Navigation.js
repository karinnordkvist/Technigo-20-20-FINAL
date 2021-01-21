import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styling
import { InnerWrapper } from '../assets/GlobalStyles';

// ----------------------------------------------------------------

export const Navigation = () => {
  return (
    <InnerWrapper>
      <LinkWrapper>
        <InnerLinkWrapperLeft>
          <div>
            <Link to="/">
              <NavImage src="./images/cb.png" />
            </Link>
          </div>
          <div>
            <a>Stories</a>
          </div>
        </InnerLinkWrapperLeft>
        <InnerLinkWrapperRight>
          <div>
            <Link to="/food">Food</Link>
          </div>
          <div>
            <a>Projects</a>
          </div>
          <div>
            <Link to={'/contact'}>Contact</Link>
          </div>
        </InnerLinkWrapperRight>
      </LinkWrapper>
    </InnerWrapper>
  );
};

// ----------------------------------------------------------------
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
