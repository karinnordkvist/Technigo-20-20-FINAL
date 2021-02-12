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

:root {
  --color-text: black;
  --color-background: lightgray;
}

body {
  margin: 0;
  background: #fcfbf8;
  font-family: 'Fraunces', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;
  color: #000;
  cursor: pointer;

  &:hover {
    font-style: italic;
    letter-spacing: 0.4px;
  }
}

button {
  font-family: 'Fraunces';
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    font-style: italic;
    letter-spacing: 0.4px;
  }
}
`;

// ----------------------------------------------------------------

// Other global styling components

export const LoaderWrapper = styled.div`
  font-family: 'Pearl';
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InnerWrapper = styled.div`
  width: 80vw;
  max-width: 800px;
  margin: 60px auto;
  z-index: 2;
`;

export const FlexWrapperSpace = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FlexWrapperCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BackButton = styled.button``;

export const BreadCrumbs = styled.p`
  font-style: italic;
  font-size: 14px;
  text-transform: capitalize;
`;
