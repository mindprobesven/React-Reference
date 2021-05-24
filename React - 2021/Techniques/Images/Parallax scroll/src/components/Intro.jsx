/* eslint-disable max-len */
import React, { useEffect } from 'react';

const Intro = () => {
  useEffect(() => {
    // console.log('<Intro> Mounted');
  }, []);

  return (
    <div className="content">
      <h1>Intro</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consequat tempus purus ac vulputate. Nunc volutpat tempus dui nec volutpat. Suspendisse mauris ante, pellentesque sed aliquam ut, facilisis eu erat. Maecenas eleifend ipsum sem, eget tempor eros egestas quis.</p>
    </div>
  );
};

export default Intro;
