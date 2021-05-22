/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { useEffect, useRef } from 'react';

import useIntersectionObserver from '../hooks/useIntersectionObserver';
import Image from './Image';

const Item = ({ data }) => {
  const ref = useRef();
  const [isVisible] = useIntersectionObserver(ref);

  useEffect(() => {
    console.log('<Item> Mounted');
  }, []);

  useEffect(() => {
    console.log('<Item> updated');
  }, [isVisible]);

  return (
    <div className="items__item-container">
      <div ref={ref} className="items__image-container">
        {
          isVisible && <Image images={data.images} />
        }
      </div>
      <div className="items__content-container">
        <div className="items__id-text">{`ID: ${data.id}`}</div>
        <a className="items__link-text" href={`/${data.slugName}`}>{data.title}</a>
        <div className="items__price-text">{`${data.price}€ (${data.discountPercent})`}</div>
        <div className="items__body-text">{data.description}</div>
      </div>
    </div>
  );
};

export default Item;
