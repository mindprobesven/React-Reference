/* eslint-disable max-len */
import React, { useEffect } from 'react';

const Item = () => {
  useEffect(() => {
    console.log('<Item> Mounted');
  }, []);

  return (
    <div className="items__item-container">
      <div className="items__image-container">
        <img
          className="items__image"
          src={`https://picsum.photos/200/200?random=${Math.floor(Math.random() * 100)}`}
          width="200"
          height="200"
          alt=""
        />
      </div>
      <div className="items__content-container">
        <div className="items__id-text">ID: 454365-4366546-4363</div>
        <a className="items__link-text" href="/">ASUS Tabled 10&quot; IPS</a>
        <div className="items__price-text">45€ (-65%)</div>
        <div className="items__body-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris volutpat quam ligula, nec posuere justo luctus sed. Cras suscipit aliquet elementum. Ut commodo lacinia erat et tincidunt. </div>
      </div>
    </div>
  );
};

export default Item;
