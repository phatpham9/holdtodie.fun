import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBtc from '@fortawesome/fontawesome-free-brands/faBtc';

import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import Calculator from './components/Calculator';

import './App.css';

const App = props => (
  <div className="app">
    <Header />

    <Container>
      <Row className="justify-content-md-center">
        <Col md="8">
          <div className="page-header">
            <FontAwesomeIcon icon={faBtc} size="6x" />
            <h2 className="page-description">ROI Calculator</h2>
          </div>
          <Calculator />
        </Col>
      </Row>
    </Container>

    <Footer />
  </div>
);

export default App;
