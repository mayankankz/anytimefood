import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form } from 'reactstrap';
import CommonSection from '../components/UI/common-section/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import '../styles/checkout.css';
import { cartActions } from '../store/shopping-cart/cartSlice';
import axios from 'axios';
import { BASEPATH } from '../config';
import { toast } from 'react-toastify';
import { cartUiActions } from '../store/shopping-cart/cartUISlice';

const Checkout = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const [enteredName, setEnteredName] = useState(userDetails?.username || '');
  const [enteredEmail, setEnteredEmail] = useState(userDetails?.email || '');
  const [enteredNumber, setEnteredNumber] = useState(userDetails?.mobilenumber || '');
  const [enteredAddress, setEnteredAddress] = useState('');
  const [paymentType, setpaymentType] = useState(null)
  const [orderId, setorderId] = useState('')


  const cartItems = useSelector((state) => state.cart.cartItems);
  const currentUser = useSelector((state) => state.auth.userDetails.id);
  console.log(cartItems);

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = 10;
  const totalAmount = cartTotalAmount + shippingCost;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(cartUiActions.toggle());
  useEffect(() => {
    // If the user is not authenticated, navigate to the login page
    dispatch(cartUiActions.toggle());
    if (!isAuthenticated) {
      console.log('User not logged in. Navigating to login page...');
      navigate('/login');
    }
  }, [isAuthenticated]);


  const validateField = (value, fieldName) => {
    if (!value.trim()) {
      toast.error(`Please enter your ${fieldName.toLowerCase()}`, {
        autoClose: 2000,
      });
      return false;
    }
    return true;
  };


  const submitHandler = async (e) => {
    e.preventDefault();

    const cheakoutDetails = {
      address: `${enteredAddress}`,
      customerId: currentUser,
      items: cartItems,
      phone: enteredNumber,
      paymentType: paymentType,
      Name: `${enteredName}`,
      orderValue: totalAmount
    };


    if (paymentType === 'Razorpay') {
      try {
        const paymentRes = await checkoutHandler(totalAmount , cheakoutDetails)
      } catch (error) {
        toast.error(`Something went wrong.`, {
          autoClose: 1500
        })
      }
    } else {
      try {
        const responce = await axios.post(`${BASEPATH}/order/placeorder`, cheakoutDetails)
        dispatch(cartActions.resetCart())
        toast.success(responce.data.message, {
          autoClose: 1500
        });


        setTimeout(() => {
          navigate("/orders")
        }, 300)


      } catch (error) {
        toast.error(error.response.data.errors[0].msg, {
          autoClose: 1500
        })
      }
    }

  };

  const checkoutHandler = async (amount ,cheakoutDetails) => {

    const { data: { key } } = await axios.get(`${BASEPATH}/payments/getkey`)

    const { data: { order } } = await axios.post(`${BASEPATH}/payments/checkout`, {
      amount
    })

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Any Time Food",
      description: "Food Anywhere any time.",
      image: "https://avatars.githubusercontent.com/u/25058652?v=4",
      order_id: order.id,
      handler: async (response) => {
				try {
					const verifyUrl =  `${BASEPATH}/payments/paymentverification`;
					const { data } = await axios.post(verifyUrl, response);
          const responce = await axios.post(`${BASEPATH}/order/placeorder`, { ...cheakoutDetails, orderID: order.id })
          dispatch(cartActions.resetCart())
          toast.success(responce.data.message, {
            autoClose: 1500
          });
          setTimeout(() => {
            navigate("/orders")
          }, 100)
				} catch (error) {
					toast.error(`payment not verified.`, {
            autoClose: 1500
          })
				}
			},
      prefill: {
        name: `${enteredName}`,
        email: "gaurav.kumar@example.com",
        contact: enteredNumber
      },
      notes: {
        "address": `${enteredAddress}`
      },
      theme: {
        "color": "#121212"
      }
    };
    const razor = new window.Razorpay(options);
    razor.open();
  }


  function handleChange(e) {
    setpaymentType(e.target.value);
  }


  return (
    <Helmet title='Checkout'>
      <CommonSection title='Checkout' />
      <section>
        <Container>
          <Row>
            <Col lg='8' md='6'>
              <h6 className='mb-4'>Order Summary</h6>
              {cartItems.length === 0 ? (
                <h5 className='text-center'>Your cart is empty</h5>
              ) : (
                <table className='table table-bordered' style={{ maxHeight: 200, overflow: 'scroll' }}>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Title</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <Tr item={item} key={item.id} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg='4' md='6'>
              <h6 className='mb-4'>Shipping Address</h6>
              <form
                action=''
                className='checkout__form'

              >
                <div className='form__group'>
                  <input
                    required
                    type='text'
                    placeholder='Name'
                    value={enteredName}
                    onChange={(e) => setEnteredName(e.target.value)}
                  />
                </div>

                <div className='form__group'>
                  <input
                    required
                    type='number'
                    value={enteredNumber}
                    placeholder='Phone number'
                    onChange={(e) => setEnteredNumber(e.target.value)}
                  />
                </div>
                <div className='form__group'>
                  <input
                    required
                    type='text'
                    placeholder='Address'
                    onChange={(e) => setEnteredAddress(e.target.value)}
                  />
                </div>


                <div lg={8} className='form__group'>
                  <select className="form-select" onChange={(e) => handleChange(e)}>
                    <option value=""> Select Payment Mode</option>
                    <option value="COD"> COD</option>
                    <option value="Razorpay">Razorpay</option>
                  </select>


                </div>

              </form>
              <div className='checkout__bill'>
                <h6 className='d-flex align-items-center justify-content-between mb-3'>
                  Subtotal:<span>₹{cartTotalAmount}</span>
                </h6>
                <h6 className='d-flex align-items-center justify-content-between mb-3'>
                  Shipping fee:<span>₹{shippingCost}</span>
                </h6>
                <div className='checkout__total'>
                  <h5 className='d-flex align-items-center justify-content-between'>
                    Total: <span>₹{totalAmount}</span>
                  </h5>
                </div>
              </div>
              <button className='addToCart__btn mt-3' onClick={submitHandler}>Place Order</button>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};


const Tr = (props) => {
  const { id, image01, title, price, quantity } = props.item;
  const dispatch = useDispatch();

  const deleteItem = () => dispatch(cartActions.deleteItem(id));
  return (
    <tr>
      <td className='text-center cart__img-box'>
        <img src={image01} alt='food'></img>
      </td>
      <td className='text-center'>{title}</td>
      <td className='text-center'>₹{price}</td>
      <td className='text-center'>{quantity} pcs</td>
      <td onClick={deleteItem} className='text-center cart__item-del'>
        <i className='ri-delete-bin-line'></i>
      </td>
    </tr>
  );
};

export default Checkout;
