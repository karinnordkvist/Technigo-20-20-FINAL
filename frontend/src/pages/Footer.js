import React from 'react';
import styled from 'styled-components/macro';
import { GoToTopButton } from '../components/GoToTopButton';

// ----------------------------------------------------------------
const now = new Date().toLocaleDateString().substring(0, 4);

export const Footer = () => {
  return (
    <FooterWrapper>
      <GoToTopButton />
      <FooterImage
        src={process.env.PUBLIC_URL + '/images/cb.png'}
        style={{ marginTop: '80px' }}
      />
      <FooterText>© Caroline Borg – {now}</FooterText>
      <FooterText>Webbsidan är byggd av <a href="https://karinnordkvist.se">K.N Dev & Design</a></FooterText>
    </FooterWrapper>
  );
};

// ----------------------------------------------------------------

const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px 0 30px;
  z-index: 5;
`;

const FooterImage = styled.img`
  width: 20px;
  margin: 20px auto 10px;
`;

const FooterText = styled.p`
  font-size: 12px;
  font-style: italic;
  margin-top: 5px;
`;
