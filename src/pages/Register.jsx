import React from 'react';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios';
import { BASEPATH } from '../config';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/Auth/Auth';

const Register = () => {
  const registerNameRef = useRef();
  const registerPasswordRef = useRef();
  const registerEmailRef = useRef();
  const registerNumberRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    const username = registerNameRef.current.value;
    const password = registerPasswordRef.current.value;
    const email = registerEmailRef.current.value;
    const mobilenumber = registerNumberRef.current.value;

    try {
      const responce = await axios.post(`${BASEPATH}/user/register`, {
        username, password, email, mobilenumber
      })
      console.log(responce.data.message)
      toast.success(responce.data.message, {
        autoClose: 1500
      });
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
    <Helmet title='Register'>
      <CommonSection title='Register' />
      <section>
        <Container>
          <Row>
            <Col lg='6' md='6' sm='12' className='m-auto text-center'>
              <form className='form mb-5' onSubmit={submitHandler}>
                <div className='form__group'>
                  <input
                    type='text'
                    placeholder='Enter Full Name'
                    ref={registerNameRef}
                  ></input>
                </div>

                <div className='form__group'>
                  <input
                    type='text'
                    placeholder='Enter Mobile Number'
                    ref={registerNumberRef}
                  ></input>
                </div>
                <div className='form__group'>
                  <input
                    type='email'
                    placeholder='Entrt Email Address'
                    ref={registerEmailRef}
                  ></input>
                </div>
                <div className='form__group'>
                  <input
                    type='password'
                    placeholder='Enter Password'
                    ref={registerPasswordRef}
                  ></input>
                </div>
                <button type='submit' className='addToCart__btn'>
                  Sign up
                </button>
              </form>
              <Link to='/login'>Already have an account? Login</Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Register;
