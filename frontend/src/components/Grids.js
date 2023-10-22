import React from 'react';
import styled from 'styled-components';

export const Grid1 = ({ image1 }) => {
  return (
    <G1ImageWrapper>
      <img src={image1.url} alt={image1.alt ? image1.alt : 'Grid Image'} />
    </G1ImageWrapper>
  );
};

export const Grid2 = ({ image1, image2 }) => {
  return (
    <G2ImageWrapper>
      <img src={image1.url} alt={image1.alt ? image1.alt : 'Grid Image'} />
      <img src={image2.url} alt={image2.alt ? image2.alt : 'Grid Image'} />
    </G2ImageWrapper>
  );
};

export const Grid3 = ({ image1, image2 }) => {
  return (
    <G3ImageWrapper>
      <img src={image1.url} alt={image1.alt ? image1.alt : 'Grid Image'} />
      <img src={image2.url} alt={image2.alt ? image2.alt : 'Grid Image'} />
    </G3ImageWrapper>
  );
};

export const Grid4 = ({ image1, image2, image3 }) => {
  return (
    <G4ImageWrapper>
      <img src={image1.url} alt={image1.alt ? image1.alt : 'Grid Image'} />
      <img src={image2.url} alt={image2.alt ? image2.alt : 'Grid Image'} />
      <img src={image3.url} alt={image3.alt ? image3.alt : 'Grid Image'} />
    </G4ImageWrapper>
  );
};

export const Grid5 = ({ image1, image2 }) => {
  return (
    <G5ImageWrapper>
      <img src={image1.url} alt={image1.alt ? image1.alt : 'Grid Image'} />
      <img src={image2.url} alt={image2.alt ? image2.alt : 'Grid Image'} />
    </G5ImageWrapper>
  );
};

export const Grid6 = ({ image1, text }) => {
  return (
    <G6ImageWrapper>
      <img src={image1.url} alt={image1.alt ? image1.alt : 'Grid Image'} />
      <p>{text}</p>
    </G6ImageWrapper>
  );
};

export const Grid7 = ({ image1, image2 }) => {
  return (
    <G7ImageWrapper>
      <img src={image1.url} alt={image1.alt ? image1.alt : 'Grid Image'} />
      <img src={image2.url} alt={image2.alt ? image2.alt : 'Grid Image'} />
    </G7ImageWrapper>
  );
};

// STYLES --------------------------------

const baseGrid = styled.div`
  width: 100%;
  display: grid;
  margin: 20px auto;
`;

const G1ImageWrapper = styled(baseGrid)`
  grid-template-columns: 1fr;

  img {
    width: 100%;
  }
`;

const G2ImageWrapper = styled(baseGrid)`
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  img {
    width: 100%;
  }
`;

const G3ImageWrapper = styled(baseGrid)`
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

const G4ImageWrapper = styled(baseGrid)`
  grid-template-columns: repeat(3, 1fr);

  img {
    width: 100%;
  }
`;

const G5ImageWrapper = styled(baseGrid)`
  grid-template-columns: repeat(12, 1fr);

  img:first-child {
    width: 100%;
    grid-column: 1 / span 5;
    grid-row: 1;
    margin-top: 60%;
    z-index: 2;
  }

  img:last-child {
    width: 100%;
    grid-column: 5 / span 8;
    grid-row: 1;
  }
`;

const G6ImageWrapper = styled(baseGrid)`
  grid-template-columns: repeat(12, 1fr);

  img {
    width: 100%;
    grid-column: 1 / span 8;
    grid-row: 1;
  }

  p {
    grid-column: 6 / span 7;
    grid-row: 1;
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

const G7ImageWrapper = styled.div`
  width: 100%;
  position: relative;

  img:first-child {
    width: 100%;
    height: 90vh;
    object-fit: cover;
    position: relative;

    @media (max-width: 900px) {
      height: 80vh;
    }
  }

  img:last-child {
    width: 50%;
    max-width: 600px;
    left: 25%;
    top: 10vh;
    height: 70vh;
    object-fit: cover;
    position: absolute;
    box-shadow: 2px 15px 15px rgba(0, 0, 0, 0.1);

    @media (max-width: 900px) {
      width: 60%;
      left: 20%;
      height: 60vh;
    }
    @media (max-width: 500px) {
      width: 90%;
      left: 5%;
      height: 60vh;
    }
  }
`;
