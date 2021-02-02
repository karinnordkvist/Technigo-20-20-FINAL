import React from 'react';
import styled from 'styled-components';

export const Grid_1 = ({ image1 }) => {
  return (
    <G1_ImageWrapper>
      <img src={image1} />
    </G1_ImageWrapper>
  );
};

export const Grid_2 = ({ image1, image2 }) => {
  return (
    <G2_ImageWrapper>
      <img src={image1} />
      <img src={image2} />
    </G2_ImageWrapper>
  );
};

export const Grid_3 = ({ image1, image2 }) => {
  return (
    <G3_ImageWrapper>
      <img src={image1} />
      <img src={image2} />
    </G3_ImageWrapper>
  );
};

export const Grid_4 = ({ image1, image2, image3 }) => {
  return (
    <G4_ImageWrapper>
      <img src={image1} />
      <img src={image2} />
      <img src={image3} />
    </G4_ImageWrapper>
  );
};

export const Grid_5 = ({ image1, image2, image3 }) => {
  return (
    <G5_ImageWrapper>
      <img src={image1} />
      <img src={image2} />
    </G5_ImageWrapper>
  );
};

export const Grid_6 = ({ image1, text }) => {
  return (
    <G6_ImageWrapper>
      <img src={image1} />
      <p>{text}</p>
    </G6_ImageWrapper>
  );
};

// STYLES --------------------------------

const baseGrid = styled.div`
  width: 100%;
  display: grid;
  margin: 20px auto;
`;

const G1_ImageWrapper = styled(baseGrid)`
  grid-template-columns: 1fr;

  img {
    width: 100%;
  }
`;

const G2_ImageWrapper = styled(baseGrid)`
  grid-template-columns: 1fr 1fr;

  img {
    width: 100%;
  }
`;

const G3_ImageWrapper = styled(baseGrid)`
  grid-template-columns: repeat(12, 1fr);

  img:first-child {
    width: 100%;
    grid-column: 1 / span 8;
    grid-row: 1;
  }

  img:last-child {
    width: 100%;
    grid-column: 7 / span 6;
    grid-row: 1;
    margin-top: 50px;
  }
`;

const G4_ImageWrapper = styled(baseGrid)`
  grid-template-columns: repeat(3, 1fr);

  img {
    width: 100%;
  }
`;

const G5_ImageWrapper = styled(baseGrid)`
  grid-template-columns: repeat(12, 1fr);

  img:first-child {
    width: 100%;
    grid-column: 1 / span 5;
    grid-row: 1;
    margin-top: 70%;
    z-index: 2;
  }

  img:last-child {
    width: 100%;
    grid-column: 5 / span 8;
    grid-row: 1;
  }
`;

const G6_ImageWrapper = styled(baseGrid)`
  grid-template-columns: repeat(12, 1fr);

  img {
    width: 100%;
    grid-column: 1 / span 8;
    grid-row: 1;
  }

  p {
    grid-column: 6 / span 7;
    grid-row: 1;
    font-family: 'Fraunces';
    font-size: 28px;
    font-style: italic;
    margin-top: 550px;

    @media (max-width: 900px) {
      font-size: 18px;
      margin-top: 100px;
      grid-column: 7 / span 7;
    }
  }
`;
