import React from 'react';
import styled from 'styled-components';

export const CategoryImage = ({
  url,
  title,
  onCategoryClickHandler,
  height,
  fontSize,
}) => {
  const formattedTitle = title.toLowerCase();

  return (
    <ImageWrapper
      url={url}
      onClick={() =>
        onCategoryClickHandler(
          formattedTitle === 'all projects'
            ? ''
            : formattedTitle === 'selected work'
            ? ''
            : formattedTitle
        )
      }
      height={height}
      fontSize={fontSize}
    >
      <p fontSize={fontSize}>{title}</p>;
    </ImageWrapper>
  );
};

const ImageWrapper = styled.div`
  background: url(${(props) => props.url});
  background-size: cover;
  background-position: center;
  height: ${(props) => props.height};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  p {
    color: #fff;
    font-family: 'Pearl';
    text-align: center;
    font-size: ${(props) => props.fontSize};
  }
`;
