import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Styling
import { InnerWrapper } from '../assets/GlobalStyles';

// Reducers
import { location } from '../reducers/location';

// ----------------------------------------------------------------

export const NotFound = () => {
  const currentLocation = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(location.actions.setLocation(currentLocation.pathname));
  }, [currentLocation]);
  return (
    <InnerWrapper>
      <p>404-page</p>
    </InnerWrapper>
  );
};
