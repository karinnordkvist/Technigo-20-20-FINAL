import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import sanityClient from '../client.js';

// Styling
import { InnerWrapper } from '../assets/GlobalStyles';

// Reducers
import { location } from '../reducers/location';

// ----------------------------------------------------------------

export const Contact = () => {
  const currentLocation = useLocation();
  const dispatch = useDispatch();

  // For back-button & breadcrumbs
  const history = useHistory();
  const formattedLocation = currentLocation.pathname
    .substring(1)
    .replaceAll('/', ' · ');

  // Fetch data
  useEffect(() => {
    dispatch(location.actions.setLocation(currentLocation.pathname));

    //   sanityClient
    //     .fetch(
    //       `*[_type == 'recipe']{
    //         _id,
    //         title,
    //         category,
    //         slug,
    //         "thumbnail":thumbnail.asset->{url, tags, title},
    //         creator,
    //         secondary_byline,
    //         intro,
    //        }`
    //     )
    //     .then((data) => setRecipe(data))
    //     .catch(console.error);
  }, []);

  return (
    <ContactInnerWrapper>
      <ContactImage src={process.env.PUBLIC_URL + '/images/caroline.jpg'} />
      {/* <ContactTitle>Want to work together?</ContactTitle> */}
      <ContactSubtitle>Kontakt</ContactSubtitle>
      <ContactText>
        “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictum
        consectetur ultrices turpis lectus. Amet commodo curabitur rutrum proin
        pulvinar rhoncus semper donec. Sit integer morbi vestibulum felis. Mi
        neque eget diam augue in.“
      </ContactText>
      <ContactInfo>
        Telefon:
        <div>+46 5453 34345</div>
      </ContactInfo>
      <ContactInfo>
        Email:
        <div>caroline@carolineborg.se</div>
      </ContactInfo>
    </ContactInnerWrapper>
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

const ContactTitle = styled.h1`
  font-size: 56px;
  font-family: 'Fraunces';
  font-weight: normal;
  font-style: italic;
  margin: 20px 0;
  text-align: center;
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
`;

const ContactInfo = styled.p`
  font-family: 'Fraunces';
  font-size: 16px;
  font-style: italic;
  text-align: center;
  margin-bottom: 15px;
`;
