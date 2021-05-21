/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { useEffect } from 'react';

const Item = ({ data }) => {
  const {
    id,
    slugName,
    title,
    description,
    price,
    discountPercent,
    images,
  } = data;

  useEffect(() => {
    console.log('<Item> Mounted');
  }, []);

  return (
    <div className="items__item-container">
      <div className="items__image-container">
        <img
          className="items__image"
          src={images[0]}
          width="200"
          height="200"
          alt=""
        />
      </div>
      <div className="items__content-container">
        <div className="items__id-text">{`ID: ${id}`}</div>
        <a className="items__link-text" href={`/${slugName}`}>{title}</a>
        <div className="items__price-text">{`${price}€ (${discountPercent})`}</div>
        <div className="items__body-text">{description}</div>
      </div>
    </div>
  );
};

export default Item;
