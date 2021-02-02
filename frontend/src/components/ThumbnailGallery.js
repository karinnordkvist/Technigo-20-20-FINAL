import React, { useState } from 'react';
import styled from 'styled-components/macro';

// ----------------------------------------------------------------

export const ThumbnailGallery = ({ project }) => {
  const [currentImage, setCurrentImage] = useState(0);

  let imageList = [];
  project.grids.map((grid) =>
    grid.images.map((image) => (imageList = [...imageList, image.url]))
  );

  const changeImage = (prop) => {
    if (prop === 'increase') {
      setCurrentImage(
        currentImage < imageList.length - 1 ? currentImage + 1 : 0
      );
    }
    if (prop === 'decrease') {
      setCurrentImage(
        currentImage > 0 ? currentImage - 1 : imageList.length - 1
      );
    }
  };

  return (
    <StoryImageWrapper>
      <StoryImageNavWrapper>
        <button onClick={() => changeImage('decrease')}>◀︎</button>
        <button onClick={() => changeImage('increase')}>▶︎</button>
      </StoryImageNavWrapper>
      <StoryThumbnail src={imageList[currentImage]} />
    </StoryImageWrapper>
  );
};

// ----------------------------------------------------------------

const StoryImageWrapper = styled.div`
  width: 50%;
  position: relative;
`;

const StoryImageNavWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    background: none;
    border: none;
    color: #fff;
    padding: 10px;
    cursor: pointer;
  }
`;

const StoryThumbnail = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  max-width: 100%;
`;
