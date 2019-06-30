import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Reset } from 'styled-reset';

import JournalInputForm from './components/JournalInputForm';

const AppGlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`;

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Reset />
      <AppGlobalStyles />
      <JournalInputForm />
    </React.Fragment>
  );
};

export default App;
