import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

<style>
  @import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');
</style>

  *,
  *::after,
  *::before {
    margin: 0px;
    padding: 0px;
    box-sizing: inherit;
  }

  html {
    font-size: 82.5%;
  }

  body {
    box-sizing: border-box;
    font-family: 'Shadows Into Light'
  }
`;

export default GlobalStyles;