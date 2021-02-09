import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Fade from 'react-reveal/Fade';

import sanityClient from '../client.js';

// Styling
import { InnerWrapper, LoaderWrapper } from '../assets/GlobalStyles';

// Reducers
import { location } from '../reducers/location';

// ----------------------------------------------------------------

export const Contact = () => {
  const currentLocation = useLocation();
  const dispatch = useDispatch();
  const [contactInfo, setContactInfo] = useState([]);

  // Fetch data
  useEffect(() => {
    dispatch(location.actions.setLocation(currentLocation.pathname));

    sanityClient
      .fetch(
        `*[_type == 'contact']{
            "main_image":main_image.asset->{url, tags, title},
            main_text,
            phone,
            email,
          }`
      )
      .then((data) => setContactInfo(data[1]))
      .catch(console.error);
  }, [dispatch, currentLocation.pathname]);

  if (!contactInfo.main_image) {
    return (
      <LoaderWrapper>
        <p>Loading...</p>
      </LoaderWrapper>
    );
  }

  return (
    <Fade>
      <ContactInnerWrapper>
        {contactInfo.main_image && (
          <ContactImage src={contactInfo.main_image.url} />
        )}
        <ContactSubtitle>Kontakt</ContactSubtitle>
        {contactInfo.main_text && (
          <ContactText>{contactInfo.main_text}</ContactText>
        )}
        <ContactInfo>
          Telefon:
          {contactInfo.phone && <div>{contactInfo.phone}</div>}
        </ContactInfo>
        <ContactInfo>
          Email:
          {contactInfo.email && (
            <a
              href={`mailto:${contactInfo.email}`}
              style={{ marginLeft: '5px' }}
            >
              {contactInfo.email}
            </a>
          )}
        </ContactInfo>
        <ContactInfo>
          Instagram:
          <a
            href="https://www.instagram.com/carolineborg/"
            style={{ marginLeft: '5px' }}
          >
            @carolineborg
          </a>
        </ContactInfo>
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

const ContactImage = styled.img`
  height: 35vh;
  margin-bottom: 30px;
`;

const ContactSubtitle = styled.h2`
  font-size: 20px;
  font-family: 'Pearl';
  font-weight: normal;
  margin: 20px 0 10px;
  text-align: center;
  text-transform: uppercase;
`;

const ContactText = styled.p`
  font-family: 'Fraunces';
  font-size: 20px;
  font-style: italic;
  text-align: center;
  max-width: 60%;
  margin: 20px 0 30px;

  @media (max-width: 900px) {
    max-width: 90%;
  }
`;

const ContactInfo = styled.div`
  font-family: 'Fraunces';
  font-size: 16px;

  text-align: center;
  margin-bottom: 15px;
`;
