import React from 'react';
import styled from 'styled-components/macro';

// Styling
import { InnerWrapper } from '../assets/GlobalStyles';

// ----------------------------------------------------------------

export const Home = () => {
  return (
    <HomeOuterWrapper>
      <HomeHero>
        <p>Hero</p>
      </HomeHero>
      <InnerWrapper>
        <p>Home-page</p>
      </InnerWrapper>
    </HomeOuterWrapper>
  );
};

const HomeOuterWrapper = styled.div``;

const HomeHero = styled.div`
  width: 100%;
  height: 400px;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url('https://cdn.sanity.io/images/yi8mv9iz/production/84b32277dff9f37579588d8c4717944249d4e4fd-1088x725.jpg');
  background-size: cover;
  z-index: -1;
`;
