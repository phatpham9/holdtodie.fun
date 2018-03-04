import React from 'react';
import { Container } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faHeart from '@fortawesome/fontawesome-free-solid/faHeart';

import './Footer.css';

const Footer = props => (
  <footer className="footer">
    <Container>
      <div className="text-center text-muted">
        Built with <FontAwesomeIcon className="text-danger" icon={faHeart} /> by <a href="https://onroads.xyz" target="_blank" rel="noopener noreferrer">Phat Pham</a> & <a href="https://github.com/phatpham9/holdtodie.fun#author--contributors" target="_blank" rel="noopener noreferrer">friends</a>
      </div>
    </Container>
  </footer>
);

export default Footer;
