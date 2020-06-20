import React, { useEffect } from 'react'

const TextFragments = props => {
  return (
    <div>
      <h3>Text Fragments</h3>
      <div>When you click on below links to navigate, a piece of text will be highlighted.</div><br/>
      <a 
        href='https://blog.chromium.org/2019/12/chrome-80-content-indexing-es-modules.html#:~:text=ECMAScript' 
        target='_blank' 
        rel='noopener noreferrer'
      >"ECMAScript Modules in Web Workers"</a><br/>
      <a 
        href='https://blog.chromium.org/2019/12/chrome-80-content-indexing-es-modules.html#:~:text=ECMAScript,ES%20Modules%20in%20Web%20Workers' 
        target='_blank' 
        rel='noopener noreferrer'
      >TextStart and TextEnd</a>
    </div>
  )
}

export default TextFragments;