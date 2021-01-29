import React from 'react';
import styled from 'styled-components';

export const Grid_1 = ({ image1, image2 }) => {
  return (
    <ImageWrapper>
      <img src={image1} />
      <img src={image2} />
    </ImageWrapper>
  );
};

const ImageWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  img {
    width: 100%;
  }
`;
