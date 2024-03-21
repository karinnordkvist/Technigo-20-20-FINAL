import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useLocation } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { useDispatch } from 'react-redux';
import Fade from 'react-reveal/Fade';
import sanityClient from '../client.js';

// Styling
import { InnerWrapper, LoaderWrapper } from '../assets/GlobalStyles.js';

// Reducers
import { location } from '../reducers/location.js';

// ----------------------------------------------------------------

export const Studio = () => {
  const currentLocation = useLocation();
  const dispatch = useDispatch();
  const [studioInfo, setStudioInfo] = useState([]);

  const SampleImageComponent = ({ value }) => {
    return (
      <img
        src={value.asset.url}
        alt={value.alt || ' '}
        loading="lazy"
        style={{ maxWidth: '100%', margin: '10px 0' }}
      />
    );
  };

  // Fetch data
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(location.actions.setLocation(currentLocation.pathname));

    sanityClient
      .fetch(
        `*[_type == 'studiorental']{
          title,
          content[]{..., _type == "image" => {asset->{url}}} 
        }`
      )
      .then((data) => setStudioInfo(data[0]))
      .catch(console.error);
  }, [dispatch, currentLocation.pathname]);

  if (!studioInfo) {
    return (
      <LoaderWrapper>
        <p>Loading...</p>
      </LoaderWrapper>
    );
  }

  return (
    <Fade>
      <ContactInnerWrapper>
        {/* {studioInfo.main_image && (
          <ContactImage src={studioInfo.main_image.url} />
        )} */}
        <ContactSubtitle>Studio Rental</ContactSubtitle>
        {studioInfo.content && (
          <PortableText
            value={studioInfo.content}
            components={{
              types: {
                image: SampleImageComponent,
              },
            }}
          />
        )}
      </ContactInnerWrapper>
    </Fade>
  );
};

// ----------------------------------------------------------------

const ContactInnerWrapper = styled(InnerWrapper)`
  margin: 150px auto 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ContactSubtitle = styled.h2`
  font-size: 20px;
  font-family: 'Pearl';
  font-weight: normal;
  margin: 20px 0 10px;
  text-align: center;
  text-transform: uppercase;
`;
