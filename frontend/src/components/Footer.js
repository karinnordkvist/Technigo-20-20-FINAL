import React from 'react';
import styled from 'styled-components/macro';

// Styling
import { InnerWrapper } from '../assets/GlobalStyles';

// ----------------------------------------------------------------
const now = new Date().toLocaleDateString().substring(0, 4);
console.log(now);

export const Footer = () => {
  return (
    <FooterWrapper>
      <FooterImage src={process.env.PUBLIC_URL + '/images/cb.png'} />
      <FooterText>© Caroline Borg – {now}</FooterText>
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
`;

const FooterImage = styled.img`
  width: 20px;
  margin: 20px auto 10px;
`;

const FooterText = styled.p`
  font-family: 'Fraunces';
  font-size: 12px;
  font-style: italic;
`;