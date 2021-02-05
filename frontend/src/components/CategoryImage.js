import React from 'react';
import styled from 'styled-components';

export const CategoryImage = ({ url, title, onCategoryClickHandler }) => {
  const formattedTitle = title.toLowerCase();

  return (
    <ImageWrapper
      url={url}
      onClick={() =>
        onCategoryClickHandler(
          formattedTitle === 'alla projekt' ? '' : formattedTitle
        )
      }
    >
      <p>{title}</p>;
    </ImageWrapper>
  );
};

const ImageWrapper = styled.div`
  background: url(${(props) => props.url});
  background-size: cover;
  background-position: center;
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  p {
    color: #fff;
    font-family: 'Pearl';
    text-align: center;
    font-size: 24px;
  }
`;
