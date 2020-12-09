import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import './styles.css';

function ContactInfo() {
  return (
      <Container className="container">
        <Row>
            <Col>
                <p><strong>Numero:</strong> (84) 9 9999-9999</p>
            </Col>
        </Row>
        <Row>
            <Col>
                <p><strong>email:</strong> test@gmail.com</p>
            </Col>
        </Row>
      </Container>
  );
}

export default ContactInfo;