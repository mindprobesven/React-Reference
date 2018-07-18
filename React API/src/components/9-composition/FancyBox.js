import React, { Component } from "react";
import "Components/9-composition/FancyBox.scss";

function FancyBox(props) { 
  return (
    <div className={`FancyBox ${props.color}`}>
      {
        props.children.map((child, index) => {
          if(child.type === 'h1' || child.type === 'p') {
            return React.cloneElement(child, { 
              key: index + 1,
              className: 'Children-color',
              style: {
                transitionDelay: `${index}s`,
              }
            });
          }
          return child;
        })
      }
    </div>
  );
}

export default FancyBox;