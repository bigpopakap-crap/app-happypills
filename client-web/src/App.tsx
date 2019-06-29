import React from 'react';
import { createGlobalStyle } from 'styled-components';

import JournalInputForm from './components/JournalInputForm';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`;

const App: React.FC = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <JournalInputForm />
    </React.Fragment>
  );
};

export default App;
