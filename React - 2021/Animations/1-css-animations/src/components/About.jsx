/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React from 'react';

const About = () => {
  const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dolor mi, finibus ut mi sit amet, viverra suscipit sapien. Nulla viverra dolor sed nibh hendrerit, vitae dapibus massa dictum. Quisque quis risus et magna volutpat facilisis. Donec massa neque, tristique in turpis et, euismod gravida purus. Quisque non elit quis tellus fringilla ultricies ut in tellus. Quisque condimentum, urna et lobortis pretium, tellus libero efficitur leo, tristique viverra sem lacus sed diam. In hac habitasse platea dictumst. Donec at auctor mauris. Aenean a volutpat lorem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus ornare lobortis diam aliquet varius. Phasellus vulputate viverra sem finibus finibus. Etiam convallis feugiat ornare. Nunc congue auctor fermentum.\n\n'.repeat(10);

  return (
    <div style={{ whiteSpace: 'pre-wrap' }}>
      <h1>About</h1>
      <p>{longText}</p>
    </div>
  );
};

export default About;
