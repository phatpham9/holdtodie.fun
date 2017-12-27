import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import Header from './components/Common/Header';
import logo from './logo.svg';
import ScraperBuilder from './components/ScraperBuilder';

import './App.css';

const App = props => (
  <div className="app">
    <Header />

    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <div className="page-header">
            <img className="page-logo" src={logo} alt="Scraper.Fun" />
            <h2 className="page-description">Scraper Builder</h2>
          </div>

          <div className="scraper-builder-wrapper">
            <ScraperBuilder />
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

export default App;
