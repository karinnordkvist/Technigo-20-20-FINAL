import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/macro';

// Styling
import { InnerWrapper } from '../assets/GlobalStyles';

// ----------------------------------------------------------------

export const Home = () => {
  const ref = useRef();
  const [offsetTop, setOffsetTop] = useState();

  useEffect(() => {
    setOffsetTop(ref.current.offsetTop);
  }, [offsetTop]);

  console.log(800 - offsetTop);

  return (
    <HomeOuterWrapper>
      <HeroBG></HeroBG>
      <HeroWrapper ref={ref}>
        <HeroTitle>Caroline Borg</HeroTitle>
      </HeroWrapper>

      <InnerWrapper>
        <p>Below?</p>
      </InnerWrapper>
    </HomeOuterWrapper>
  );
};

const HomeOuterWrapper = styled.div``;

const HeroTitle = styled.h1`
  font-family: 'Pearl';
  text-align: center;
  font-size: 100px;
  color: #fff;
  font-weight: normal;
  padding-top: 260px;
`;

const HeroBG = styled.div`
  width: 100%;
  height: 800px;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url('https://cdn.sanity.io/images/yi8mv9iz/production/84b32277dff9f37579588d8c4717944249d4e4fd-1088x725.jpg');
  background-size: cover;
  z-index: -1;
`;

const HeroWrapper = styled.div`
  /* background: red; */
  height: 750px;
`;
