import styled, { createGlobalStyle } from 'styled-components/macro';

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

html {
  width: 100%;
  height: 100%;
}

body {
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root {
  width: 100%;
  height: 100%;
}

a {
  font-family: 'Fraunces';
  text-decoration: none;
  color: #000;
  cursor: pointer;

  &:hover {
    font-style: italic;
    letter-spacing: 0.4px;
  }
}
`;

// ----------------------------------------------------------------

// Other global styling components

export const InnerWrapper = styled.div`
  width: 60vw;
  max-width: 800px;
  margin: 60px auto;
  z-index: 2;
`;
