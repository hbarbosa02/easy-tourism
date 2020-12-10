import React from 'react';
import { Form, Nav, Button, FormControl, Navbar, Row, Container, Col } from 'react-bootstrap';

import ContactInfo from '../ContactInfo';

import './styles.css';

function HeaderMenu() {
  return (
    <header>
      <Container className="navbar-container">
        <div className="nav-row">
          <Row className="nav-infos">
            <Col md={4}><h3>PH Viagens e turismo</h3></Col>
            <Col sm={{ span: 3, offset: 5  }}>
              <ContactInfo />
            </Col>
          </Row>
          <Row>
            <Col>
              <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">PH Viagens</Navbar.Brand>
                <Nav className="mr-auto">
                  <Nav.Link href="/">Inicio</Nav.Link>
                  <Nav.Link href="/travels">Viagens</Nav.Link>
                  <Nav.Link href="/">preços</Nav.Link>
                </Nav>
                <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="outline-info">Search</Button>
                </Form>
              </Navbar>
            </Col>
          </Row>
        </div>
      </Container>
    </header>
  );
}

export default HeaderMenu;