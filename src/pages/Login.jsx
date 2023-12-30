import React from 'react';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios';
import { BASEPATH } from '../config';
import { authActions } from '../store/Auth/Auth';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Login = () => {
  const loginNameRef = useRef();
  const loginPasswordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = async(e) => {
    e.preventDefault();

    const email = loginNameRef.current.value;
    const password = loginPasswordRef.current.value;

    try {
      const responce = await axios.post(`${BASEPATH}/user/login`, {
        email, password
      })
      toast.success(responce.data.message, {
        autoClose: 1500
      });
      localStorage.setItem('token', responce.data.token);
      dispatch(authActions.Authenticated((responce.data.user)))
      navigate('/Home')
      
    } catch (error) {

      if (error.response.data.errors) {
        toast.error(error.response.data.errors[0].msg, {
          autoClose: 1500
        })
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1500
        });
      }
    }
  };
  return (
    <Helmet title='Login'>
      <CommonSection title='Login' />
      <section>
        <Container>
          <Row>
            <Col lg='6' md='6' sm='12' className='m-auto text-center'>
              <form className='form mb-5' onSubmit={submitHandler}>
                <div className='form__group'>
                  <input
                    type='text'
                    placeholder='Mobile Number'
                    ref={loginNameRef}
                  ></input>
                </div>
                <div className='form__group'>
                  <input
                    type='password'
                    placeholder='Password'
                    ref={loginPasswordRef}
                  ></input>
                </div>
                <button type='submit' className='addToCart__btn'>
                  Login
                </button>
              </form>
              <Link to='/register'>First time here? Create an account</Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
