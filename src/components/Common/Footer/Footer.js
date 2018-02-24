import React from 'react';
import { Container } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faHeart from '@fortawesome/fontawesome-free-solid/faHeart';

import './Footer.css';

const Footer = props => (
  <footer className="footer">
    <Container>
      <div className="text-center text-muted">
        Built with <FontAwesomeIcon className="text-danger" icon={faHeart} /> by <a href="https://chauduongfood.com" target="_blank" rel="noopener noreferrer">Chau Duong</a>
      </div>
    </Container>
  </footer>
);

export default Footer;
