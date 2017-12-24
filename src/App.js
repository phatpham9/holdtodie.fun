import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import logo from './logo.svg';

import './App.css';

const App = props => (
  <Container>
    <Row className="justify-content-md-center">
      <Col md="6">
        <div className="app">
          <header className="app-header">
            <img className="app-logo" src={logo} alt="Scraper.Fun" />
            <h2 className="app-description">Scraper Builder</h2>
          </header>
        </div>
      </Col>
    </Row>
  </Container>
);

export default App;
