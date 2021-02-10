import * as React from 'react'

const InfoBox = () => {
  return (
    <div className="info-box">
      <h3 className="headline">ANIMATED DRAG LIST V0.21 BETA BY SVEN KOHN</h3>
      <p className="body-text">React + TypeScript + SASS | {`<`} 15 KBs | Chrome (stable) - Safari (untested)</p>
      <p className="body-text">Responsive animated list component with the functionality to re-order items by dragging them vertically.
      Supports both touch and mouse events. Smooth animations using requestAnimationFrame, debouncing and no absolute positioning. Refactored
      and readable source code with static typing. Highly optimized using a single action listener and shouldComponentUpdate hook. Includes
      Jest / Enzyme unit test.</p>
    </div>
  )
}

export default InfoBox