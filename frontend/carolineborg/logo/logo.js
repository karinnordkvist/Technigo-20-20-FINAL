import React from 'react';
import styled from 'styled-components';

const myLogo = () => <Image src="/static/cb.png" alt="Caroline Borg" />;

export default myLogo;

const Image = styled.img`
  width: 20px;
  filter: invert(1);
  height: auto;
`;
