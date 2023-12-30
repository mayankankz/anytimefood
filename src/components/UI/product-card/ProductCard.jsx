import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/product-card.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store/shopping-cart/cartSlice';
import { BASEPATH } from '../../../config';
const ProductCard = (props) => {
  console.log(props.item);
  const { id, title, Imgs, price } = props.item;
  const img = Imgs[0]?.split('uploads')[1]
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        img: `${BASEPATH}/${img}`,
        price,
      })
    );
  };
  return (
    <div className='product__item'>
      <div className='product__img'>
        <img style={{height: '150px',width: '100%'}} src={`${BASEPATH}/${img}`} alt='product-img' />
      </div>
      <div className='product__content'>
        <h5>
          <Link to={`/foods/${id}`}>{title}</Link>
        </h5>
        <div className='d-flex align-items-center justify-content-between'>
          <span className='product__price'>₹{price}</span>
          <button onClick={addToCart} className='addToCart__btn'>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
