import React from 'react'
import CommonSection from '../components/UI/common-section/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import { Col, Container, Row } from 'reactstrap'

function AllOrders() {
  return (
    <Helmet title='All Orders'>
    <CommonSection title='All Orders' />
    <section>
      <Container>
        <Row>
          <Col><h1>All Orders</h1></Col>
        </Row>
      </Container>
    </section>
  </Helmet>
  )
}

export default AllOrders