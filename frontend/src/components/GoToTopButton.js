import React from 'react';

import { FlexWrapperCenter } from '../assets/GlobalStyles';

export const GoToTopButton = () => {
  const handleGoToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <FlexWrapperCenter>
      <button onClick={handleGoToTop}>Go to top &#8613;</button>
    </FlexWrapperCenter>
  );
};
