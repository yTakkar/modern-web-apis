import React, { useState } from 'react'

const Clipboard = props => {
  const copyValue = 'quick brown fox jumps over the lazy dog';

  const [pasteValue, setPasteValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const copy = () => {
    navigator.clipboard.writeText(copyValue)
  }

  const paste = () => {
    navigator.clipboard.readText()
      .then(setPasteValue)
      .catch(e => setErrorMessage(e.message))
  }

  const copyImage = async () => {
    try {
      const response = await fetch(
        'https://a2.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1225387_1296x729.jpg&w=360&h=360&scale=crop&cquality=80&location=origin'
      )
      const blob = await response.blob()
      const data = new ClipboardItem({  // eslint-disable-line
        [blob.type]: blob
      })

      await navigator.clipboard.writeText([ data ])

    } catch (e) {
      setErrorMessage(e.message)
    }
  }

  return (
    <div>
      <h3>Clipboard API</h3>

      <div><i>Copy value: {copyValue}</i></div>
      <div><i>Paste value: {pasteValue}</i></div>

      <br/>
      <button onClick={copy}>Copy</button>&nbsp;
      <button onClick={paste}>Paste</button>

      <br/>
      <br/>

      <div>
        <img src='/taj-mahal-1.jpg' alt='Taj Mahal 1' width='350' />
      </div>
      <button onClick={copyImage}>Copy the above image</button>

      <br/>
      <br/>
      <div><b>{errorMessage}</b></div>
    </div>
  )
}

export default Clipboard;