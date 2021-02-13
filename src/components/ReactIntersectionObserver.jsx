import React, { useRef, useEffect } from 'react';
import NativeIntersectionObserver from '../lib/NativeIntersectionObserver';

/*
  A react wrapper around lib/Observer to use on react components.
  https://codesandbox.io/s/0xq11z660v
*/
const ReactIntersectionObserver = ({ children, options, onIntersect }) => {
  const ref = useRef();

  useEffect(() => {
    const observer = new NativeIntersectionObserver({
      options,
    });

    observer.observe(ref.current, onIntersect);

    return () => {
      observer.unobserve(ref.current);
    };
  }, [onIntersect, options]);

  return <div ref={ref}>{children}</div>;
};

export default ReactIntersectionObserver;
