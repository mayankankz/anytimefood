import React, { useState, useEffect } from 'react';
import Helmet from '../components/Helmet/Helmet.js';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import heroImg from '../assets/images/hero.png';
import bg from '../assets/images/bg.svg'
import '../styles/hero-section.css';
import { Link } from 'react-router-dom';
import Category from '../components/UI/category/Category.jsx';
import '../styles/home.css';
import featureImg01 from '../assets/images/service-01.png';
import featureImg02 from '../assets/images/service-02.png';
import featureImg03 from '../assets/images/service-03.png';
import products from '../assets/fake-data/products.js';
import foodCategoryImg01 from '../assets/images/hamburger.png';
import foodCategoryImg02 from '../assets/images/pizza.png';
import foodCategoryImg03 from '../assets/images/bread.png';
import ProductCard from '../components/UI/product-card/ProductCard.jsx';
import whyImg from '../assets/images/location.png';
import networkImg from '../assets/images/network.png';
import TestimonialSlider from '../components/UI/slider/TestimonialSlider.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { productsActions } from '../store/Products/Products.js';
import { BASEPATH } from '../config.js';
import axios from 'axios';
const { io } = require("socket.io-client");


const featureData = [
  {
    title: 'Quick Delivery',
    imgUrl: featureImg01,
  },
  {
    title: '24x7 Service',
    imgUrl: featureImg02
  },
  {
    title: 'Easy Pick Up',
    imgUrl: featureImg03
  }
];
const Home = () => {
  const [category, setCategory] = useState('ALL');
  const [allProducts, setAllProducts] = useState([]);
  const [hotPizza, setHotPizza] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io('http://localhost:7000');
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASEPATH}/admin/getallitems`);
        console.log(response.data);
        setAllProducts(response.data.Items)
        dispatch(productsActions.initProducts({ products: response.data.Items, categorys: response.data.categorys }))
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      socket.disconnect();
    };
  }, [])

  const productsList = useSelector((state) => state.products.products);

  const categoryList = useSelector((state) => state.products.categorys);



  useEffect(() => {
    const filteredPizza = productsList.filter((item) => item.category === 'Special Menu');
    const slicePizza = filteredPizza.slice(0, 4);
    setHotPizza(slicePizza);
  }, []);
  useEffect(() => {
    if (category === 'ALL') {
      setAllProducts(productsList);
    }
    if (category === 'Special Menu') {
      debugger
      const filteredProducts = productsList.filter(
        (item) => item.category === 'Special Menu'
      );
      setAllProducts(filteredProducts);
    }
    if (category === 'Combo Menu') {
      const filteredProducts = productsList.filter(
        (item) => item.category === 'Combo Menu'
      );
      setAllProducts(filteredProducts);
    }
    if (category === 'Paratha Combo') {
      const filteredProducts = productsList.filter(
        (item) => item.category === 'Paratha Combo'
      );
      setAllProducts(filteredProducts);
    }
    if (category === 'Spiced Curries') {
      const filteredProducts = productsList.filter(
        (item) => item.category === 'Spiced Curries'
      );
      setAllProducts(filteredProducts);
    }
  }, [category]);
  return (
    <Helmet title='Home'>
      <section>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className='hero__content'>
                <h5 className='mb-3'>
                  Fast and easy food delivery service to spoil the foodie within
                  you
                </h5>
                <h1 className='mb-4 hero__title'>
                  <span>HUNGRY?</span> just wait <br /> food at
                  <span> your door!</span>
                </h1>

                <p>
                  Because Every Meal Should Be an Event:
                  Transform your dining moments with our culinary creations - where fast and easy meet gourmet excellence!
                </p>

                <div className='hero__btns d-flex align-items-center gap-5 mt-4'>
                  <button className='order__btn d-flex align-items-center justify-content-between'>
                    Order now <i className='ri-arrow-right-s-line'></i>
                  </button>

                  <button className='all__foods-btn'>
                    <Link to='/foods'>See All Items</Link>
                  </button>
                </div>
                <div className='hero__service d-flex align-items-center gap-5 mt-5'>
                  <p className='d-flex align-items-center gap-2'>
                    <span className='shipping__icon'>
                      <i className='ri-car-line'></i>
                    </span>
                    Free Delivery
                  </p>
                  <p className='d-flex align-items-center gap-2'>
                    <span className='shipping__icon'>
                      <i className='ri-shield-check-line'></i>
                    </span>
                    100% secure checkout
                  </p>
                </div>
              </div>
            </Col>
            <Col lg='6' md='6'>
              <div className='hero__img'>
                <img src={bg} alt='hero-img' className='w-100' />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='pt-0'>
        <Category />
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h5 className='feature__subtitle mb-4'>What we serve</h5>
              <h2 className='feature__title'> Just sit back at home</h2>
              <h2 className='feature__title'>
                we will <span>take care</span>
              </h2>

            </Col>

            {featureData.map((item, index) => {
              return (
                <Col lg='4' md='6' sm='6' key={index} className='mt-5'>
                  <div className='feature__item text-center px-5 py-3'>
                    <img
                      className='w-25 mb-3'
                      src={item.imgUrl}
                      alt='feature-img'
                    />
                    <h5 className='fw-bold mb-3'>{item.title}</h5>
                    <p>{item.desc}</p>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h2>Menu</h2>
            </Col>
            <Col lg='12'>
              <div className='food__category d-flex align-items-center justify-content-center gap-5'>
                <button
                  onClick={() => setCategory('ALL')}
                  className={`all__btn ${category === 'ALL' ? 'foodBtnActive' : ''
                    }`}
                >
                  All
                </button>
                <button
                  onClick={() => setCategory('Special Menu')}
                  className={`d-flex align-items-center gap-2 ${category === 'Special Menu' ? 'foodBtnActive' : ''
                    }`}
                >
                  <img src={foodCategoryImg01} alt='' />
                  Special Menu
                </button>
                <button
                  onClick={() => setCategory('Combo Menu')}
                  className={`d-flex align-items-center gap-2 ${category === 'Combo Menu' ? 'foodBtnActive' : ''
                    }`}
                >
                  <img src={foodCategoryImg02} alt='' />
                  Combo Menu
                </button>
                <button
                  onClick={() => setCategory('Paratha Combo')}
                  className={`d-flex align-items-center gap-2 ${category === 'Paratha Combo' ? 'foodBtnActive' : ''
                    }`}
                >
                  <img src={foodCategoryImg03} alt='' />
                  Paratha Combo
                </button>
                <button
                  onClick={() => setCategory('Spiced Curries')}
                  className={`d-flex align-items-center gap-2 ${category === 'Spiced Curries' ? 'foodBtnActive' : ''
                    }`}
                >
                  <img src={foodCategoryImg03} alt='' />
                  Spiced Curries
                </button>
              </div>
            </Col>

            {allProducts.map((item) => {
              return (
                <Col lg='3' md='4' sm='6' xs='6' key={item.id} className='mt-5'>
                  <ProductCard item={item} />
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      <section className='why__choose-us'>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <img src={whyImg} alt='why-foodie' className='w-100'></img>
            </Col>
            <Col lg='6' md='6'>
              <div className='why__foodie'>
                <h2 className='foodie-title mb-4'>
                  Why <span>Any Time Food?</span>
                </h2>
                <p className='foodie-desc'>
                  Elevate Your Dining Experience:
                  At Any Time Food, we redefine the way you enjoy meals. Indulge in Culinary Excellence, where every dish is a masterpiece.
                </p>
                <ListGroup className='mt-4'>
                  <ListGroupItem className='border-0 ps-0'>
                    <p className='choose__us-title d-flex align-items-center gap-2'>
                      <i className='ri-checkbox-circle-line'></i>Fresh and Tasty
                      food
                    </p>
                    <p className='choose__us-desc'>
                      Experience a symphony of flavors that tantalize your taste buds. Fresh and Tasty Culinary Delights await!
                    </p>
                  </ListGroupItem>
                  <ListGroupItem className='border-0 ps-0'>
                    <p className='choose__us-title d-flex align-items-center gap-2'>
                      <i className='ri-checkbox-circle-line'></i>Quality support
                    </p>
                    <p className='choose__us-desc'>
                      Our dedicated team is here to ensure your dining experience is nothing short of extraordinary.
                    </p>
                  </ListGroupItem>
                  <ListGroupItem className='border-0 ps-0'>
                    <p className='choose__us-title d-flex align-items-center gap-2'>
                      <i className='ri-checkbox-circle-line'></i>Order from any
                      location
                    </p>
                    <p className='choose__us-desc'>
                      From the bustling city to the quiet countryside, enjoy the convenience of ordering top-notch cuisine wherever you are.
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className='border-0 ps-0'>
                    <p className='choose__us-title d-flex align-items-center gap-2'>
                      <i className='ri-checkbox-circle-line'></i>Add Some Spice to Your Day:
                    </p>
                    <p className='choose__us-desc'>
                      Elevate your dining routine with Any Time Food – because every meal should be a celebration! </p>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
        <Container>
          <Row>
            <Col lg='12' className='text-center mb-5'>
              <h2>Popular Items</h2>
            </Col>

            {hotPizza.map((item) => (
              <Col lg='3' md='4' key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className='testimonial'>
                <h5 className='testimonial__subtitle mb-4'>Testimonial</h5>
                <h2 className='testimonial__title mb-40'>
                  What our <span>customers </span>are saying
                </h2>
                <p className='testimonial__desc'>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolor accusantium magni omnis culpa cupiditate nesciunt amet,
                  fugit nam doloremque rem.
                </p>
                <TestimonialSlider />
              </div>
            </Col>
            <Col lg='6' md='6'>
              <img src={networkImg} alt='testimonial-img' className='w-100' />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
