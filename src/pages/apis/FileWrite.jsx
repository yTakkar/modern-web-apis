/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'
import Back from '../../components/Back'
import { fileOpen, fileSave } from 'browser-fs-access'

const FileWrite = props => {
  const [error, setError] = useState(null)
  const [fileContent, setFileContent] = useState(null)
  const fileBlob = useRef(null)
  const fileHandler = useRef(null)

  useEffect(() => {
    if (!window.showOpenFilePicker) {
      setError('API is not supported in your browser')
    }
  }, [])

  const openFile = e => {
    fileOpen({
      multiple: false,
      mimeTypes: ['text/*']
    })
      .then(async blob => {
        fileBlob.current = blob
        fileHandler.current = blob.handle;

        const file = await blob.handle.getFile();
        const content = await file.text();
        setFileContent(content)
      })
      .catch(e => {
        setError(e.message)
      })
  }

  const saveFile = () => {
    fileHandler.current.createWritable()
      .then(async writable => {
        await writable.write(fileContent);
        await writable.close();
      })
      .catch(e => {
        setError(e.message)
      })
  }

  const saveAsFile = () => {
    fileSave(fileBlob.current, {})
      .then(fileHandle => {
        fileHandler.current = fileHandle;
      })
      .catch(e => {
        setError(e.message)
      })
  }

  const renderFileEditor = () => {
    if (!fileContent) {
      return null
    }

    return (
      <div>
        <textarea cols='35' rows='35' value={fileContent} onChange={e => setFileContent(e.target.value)} ></textarea>
        <div>
          <button onClick={saveFile} >Save</button>
          <button onClick={saveAsFile} >Save As</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Back/>

      <br/>

      <div>
        <button onClick={openFile}>Open file</button>
      </div>

      <br/>

      {renderFileEditor()}

      <br/>

      <div>{error}</div>
    </div>
  )
}

export default FileWrite
