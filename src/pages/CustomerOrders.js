import React from 'react'
import { useParams } from 'react-router-dom';
import CommonSection from '../components/UI/common-section/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { Col, Container, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { BASEPATH } from '../config';
import { useState } from 'react';
import { toast } from 'react-toastify';
import TrackOrder from '../components/TrackOrder/TrackOrder';
import { io } from 'socket.io-client';
import moment from 'moment';

function CustomerOrders() {
    const [Orders, setOrders] = useState([]);
    const currentUser = useSelector((state) => state.auth.userDetails.id);
    const socket = io('http://localhost:7000');
    const [basicModal, setBasicModal] = useState(false);
    const [order, setOrder] = useState(null);
    const [isOrderUpdated,setIsOrderUpdated] = useState(false);


    useEffect(() => {
        async function getMyOrders() {
            try {
                const MyOrders = await axios.get(`${BASEPATH}/order/customer/orders/${currentUser}`);

                console.log(MyOrders);

                setOrders(MyOrders.data.AllOrders)
            } catch (error) {
                toast.error(error.response.data.message, {
                    autoClose: 1500
                });
            }
        }
        getMyOrders()
    }, [])

    useEffect(() => {
        async function getMyOrders() {
            try {
                const MyOrders = await axios.get(`${BASEPATH}/order/customer/orders/${currentUser}`);

                console.log(MyOrders);

                setOrders(MyOrders.data.AllOrders)
            } catch (error) {
                toast.error(error.response.data.message, {
                    autoClose: 1500
                });
            }
        }
        getMyOrders()
    }, [isOrderUpdated])


    

    function openTrackingModel(order) {

        setOrder(order);

        setBasicModal(true);
    }

    return (
        <Helmet title='My Orders'>
            <CommonSection title='My Orders' />
            <section>
                <Container>
                    <Row>
                        <Col lg='12' md='6'>
                        <div className="table-container">
                            {Orders.length ? <table className='table table-bordered'>
                                <thead>
                                    <tr>

                                        <th>OrderID</th>
                                        <th>Order Items</th>
                                        <th>Address</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Orderd At</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {Orders.map((order) => (
                                        <Tr openTrackingModel={openTrackingModel} item={order} key={order.id} />
                                    ))}
                                </tbody>
                            </table> : <div className="noorder"><i class="ri-shopping-cart-2-line" style={{ fontSize: '130px' }}></i><h2>No Orders places yet</h2></div>}
                        </div>
                            </Col>

                    </Row>

                </Container>
            </section>
            {basicModal && <TrackOrder order={order} basicModal={basicModal} setBasicModal={setBasicModal} setIsOrderUpdated={setIsOrderUpdated} />}

        </Helmet>
    )
}


const Tr = (props) => {
    const { id, OrderId,items, phone, status, address, createdAt } = props.item;
    const { openTrackingModel } = props
    const getStatusName = (status) => {
        switch (status) {
          case 'order_placed':
            return 'Order Placed';
          case 'order_confirmed':
            return 'Order Confirmed';
          case 'order_preparing':
            return 'Order Preparing';
          case 'order_OFD':
            return 'On the Way';
          case 'order_delivered':
            return 'Order Delivered';
          default:
            return '';
        }
      };
      
    return (
        <tr>
            <td style={{ cursor: 'pointer' }} onClick={() => openTrackingModel({ id, OrderId, phone, status, address, createdAt })}>
                {OrderId}
            </td>
            <td >{JSON.parse(items).map((item, i) =>{
                return <div>{item.title} - x{item.quantity},</div>
            })}</td>
            <td >{address}</td>
            <td className='text-center'>{phone}</td>
            <td className='text-center font-weight-bold'>{getStatusName(status)}</td>
            <td className='text-center'>
                {moment(createdAt).format('DD-MM-YYYY HH:mm:ss')}
            </td>
        </tr>
    );
};

export default CustomerOrders