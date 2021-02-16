/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Back from '../../components/Back'

const FileRead = props => {
  const [error, setError] = useState(null)
  const [file, setFile] = useState(null)
  const [fileContent, setFileContent] = useState(null)

  useEffect(() => {
    if (!file) {
      setFileContent(null)
    }
  }, [file])

  const onFileChange = e => {
    const { files } = e.target

    setFile(files[0])

    if (!window.FileReader) {
      setError('API is not supported in your browser')
    } else {
      for (let file of files) {
        const reader = new FileReader()
  
        reader.addEventListener('load', ev => {
          let fileContent = {
            type: file.type,
            content: ev.target.result,
          }
          setFileContent(fileContent)
        })
  
        if (file.type.indexOf('image') !== -1) {
          reader.readAsDataURL(file)
        } else {
          reader.readAsText(file)
        }
      }
    }
  }

  const renderContent = () => {
    if (!fileContent) {
      return null
    }

    if (fileContent.type.indexOf('image') !== -1) {
      return <img width='320' src={fileContent.content} alt='File preview' />
    } else {
      return <textarea cols='35' rows='50'>{fileContent.content}</textarea>
    }
  }

  return (
    <div>
      <Back/>
      <br/>

      <div>
        <input type='file' onChange={onFileChange} />
      </div>

      <br/>

      <div>
        {renderContent()}
      </div>

    </div>
  )
}

export default FileRead
