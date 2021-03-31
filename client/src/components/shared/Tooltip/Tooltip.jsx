import React, { useState } from 'react';
import './Tooltip.css';

// https://dev.to/vtrpldn/how-to-make-an-extremely-reusable-tooltip-component-with-react-and-nothing-else-3pnk

export default function Tooltip({ children, delay, content, direction }) {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 50);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className="tooltip__wrapper"
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {children}
      {active && (
        <div className={`tooltip__tip ${direction || 'top'}`}>
          {/* Content */}
          {content}
        </div>
      )}
    </div>
  );
}
