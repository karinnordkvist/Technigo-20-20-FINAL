import React from 'react';

import { ButtonWrapper } from '../assets/GlobalStyles';

export const GoToTopButton = () => {
  const handleGoToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ButtonWrapper>
      <button onClick={handleGoToTop}>Gå till toppen &#8613;</button>
    </ButtonWrapper>
  );
};
