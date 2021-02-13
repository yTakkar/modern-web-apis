import React, { useState, useRef, useEffect } from 'react'
import NativeIntersectionObserver from '../lib/NativeIntersectionObserver'

const LazyImage = props => {

  const ref = useRef(null)
  const [src, setSrc] = useState('/placeholder.png')

  useEffect(() => {
    // We dont need separate Observer for each image
    if (!window.imgObserver) {
      window.imgObserver = new NativeIntersectionObserver({
        options: { threshold: 0 },
        observeOnce: true,
      });
    }
    window.imgObserver.observe(ref.current, () => {
      setSrc(props.src)
    });
  }, [props.src]);

  return (
    <img ref={ref} src={src} alt='' style={props.style} className={props.className} />
  )
}

export default LazyImage;
