import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';

// ----------------------------------------------------------------

export const ThumbnailGallery = ({ project }) => {
  const history = useHistory();
  const [currentImage, setCurrentImage] = useState(0);
  let imageList = [];

  // Gather all images from all grids and compile to array
  project.grids.map((grid) =>
    grid.images.map((image) => (imageList = [...imageList, image.url]))
  );

  // Method-functions for switching between images
  const changeImage = (method) => {
    if (method === 'increase') {
      setCurrentImage(
        currentImage < imageList.length - 1 ? currentImage + 1 : 0
      );
    }
    if (method === 'decrease') {
      setCurrentImage(
        currentImage > 0 ? currentImage - 1 : imageList.length - 1
      );
    }
  };

  return (
    <StoryImageWrapper>
      <StoryImageNavWrapper>
        <button onClick={() => changeImage('decrease')}>&#60;</button>
        <button onClick={() => changeImage('increase')}>&#62;</button>
      </StoryImageNavWrapper>
      <StoryThumbnail
        src={imageList[currentImage]}
        onClick={() => history.push('/projects/' + project.slug.current)}
      />
    </StoryImageWrapper>
  );
};

// ----------------------------------------------------------------

const StoryImageWrapper = styled.div`
  width: 50%;
  position: relative;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const StoryImageNavWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    font-family: 'Pearl';
    font-size: 25px;
    background: none;
    border: none;
    color: #fff;
    padding: 15px;
    cursor: pointer;
    outline-color: #fff;
  }
`;

const StoryThumbnail = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  max-width: 100%;
  cursor: pointer;
`;
