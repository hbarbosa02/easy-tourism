import React from 'react';
import { Container } from 'react-bootstrap';

import HeaderMenu from './components/HeaderMenu';
import Routes from './routes';

import './App.css';

function App() {
  return (
    <Container className="App" fluid="lg">
      <header>
        <HeaderMenu className="navbar" />
      </header>
      <body>
        test
      </body>
    </Container>
  );
}

export default App;
