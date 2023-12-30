import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import logo from '../../assets/images/res-logo.png';
import '../../styles/footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg='4' md='3' sm='6'>
            <div className='footer__logo text-start'>
              <img src={logo} alt='logo' />
              <h5>Any Time Food</h5>
              <p>
                Fast and easy food delivery service to spoil the foodie within
                you.
              </p>
            </div>
          </Col>
          <Col lg='4' md='3' sm='6'>
            <h5 className='footer__title'>Delivery Time</h5>
            <ListGroup className='delivery__time-list'>
              <ListGroupItem className='delivery__time-item border-0 ps-0'>
                <span>Monday - Sunday</span>
                <p></p>
              </ListGroupItem>

              <ListGroupItem className='delivery__time-item border-0 ps-0'>
                <span>24 x 7 Service</span>
                <p></p>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col lg='4' md='3' sm='6'>
            <h5 className='footer__title'>Contact</h5>
            <ListGroup className='delivery__time-list'>
              <ListGroupItem className='delivery__time-item border-0 ps-0'>
                <span>Location: 204, balaji heights , deendayal bus stand , jabalpur , 482002</span>
              </ListGroupItem>

              <ListGroupItem className='delivery__time-item border-0 ps-0'>
                <span>Hotline:  +917691939393</span>
              </ListGroupItem>

              <ListGroupItem className='delivery__time-item border-0 ps-0'>
                <span>Email: contact@anytimefood.com</span>
              </ListGroupItem>
            </ListGroup>
          </Col>
          
        </Row>
        <Row className='mt-5'>
          <Col lg='6' md='6'>
            <p className='copyright__text'>
              Copyright - {new Date().getFullYear()}, AnytimeFood.com
            </p>
          </Col>
          <Col lg='6' md='6'>
            <div className='social__links d-flex align-items-center gap-4 justify-content-end'>
              <p className='m-0'>Follow us: </p>
              <span>
                <Link to='#'>
                  <i className='ri-facebook-circle-fill'></i>
                </Link>
              </span>
              <span>
                <Link to='#'>
                  <i className='ri-github-fill'></i>
                </Link>
              </span>
              <span>
                <Link to='#'>
                  <i className='ri-linkedin-box-fill'></i>
                </Link>
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
