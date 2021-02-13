import React, { useState, useRef, useEffect } from 'react'
import Back from '../../components/Back';
import LazyImage from '../../components/LazyImage';
import ReactIntersectionObserver from '../../components/ReactIntersectionObserver'

const IntersectionObserver = props => {
  const imagesList = [
    '/taj-mahal-1.jpg',
    '/taj-mahal-2.jpg',
    '/taj-mahal-3.jpg',
    '/taj-mahal-4.jpg',
    '/taj-mahal-1.jpg',
    '/taj-mahal-2.jpg',
    '/taj-mahal-3.jpg',
    '/taj-mahal-4.jpg',
    '/taj-mahal-1.jpg',
    '/taj-mahal-2.jpg',
    '/taj-mahal-3.jpg',
    '/taj-mahal-4.jpg',
    '/taj-mahal-1.jpg',
    '/taj-mahal-2.jpg',
    '/taj-mahal-3.jpg',
    '/taj-mahal-4.jpg',
  ]

  const [error, setError] = useState(null)
  const infiniteScrollRef = useRef(null)

  useEffect(() => {
    if (!window.IntersectionObserver) {
      setError('API is not supported in your browser')
    }
  }, [])

  const [images, setImages] = useState(imagesList)

  const onInfiniteScrollIntersect = () => {
    setImages([
      ...images,
      ...imagesList,
    ])
  }

  return (
    <div>
      <Back/>
      <br/>

      <div>Images below will be lazy-loaded. There's also support for infinite scroll.</div>
      <br/>

      {images.map((image, index) => 
        <div key={index}>
          <LazyImage style={{ width: 400, marginBottom: 20 }} src={image} />
        </div>
      )}

      <div  />

      <ReactIntersectionObserver 
        options={{
          threshold: 0,
        }}
        onIntersect={onInfiniteScrollIntersect}
      >
        <div className='infinite-scroll' style={{
          height: 100
        }} ref={infiniteScrollRef}>{error}</div>
      </ReactIntersectionObserver>

    </div>
  )
}

export default IntersectionObserver;