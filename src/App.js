import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCode from '@fortawesome/fontawesome-free-solid/faCode';

import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import ScraperBuilder from './components/ScraperBuilder';

import './App.css';

const App = props => (
  <div className="app">
    <Header />

    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <div className="page-header">
            <FontAwesomeIcon icon={faCode} size="6x" />
            <h2 className="page-description">Scraper Builder</h2>
          </div>

          <div className="scraper-builder-wrapper">
            <ScraperBuilder />
          </div>
        </Col>
      </Row>
    </Container>

    <Footer />
  </div>
);

export default App;
