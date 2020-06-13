import React, { useState } from 'react'

const ShareApi = props => {
  const [uploadedFiles, setUploadedFiles] = useState([])

  const share = ({ title, url, text, files }) => {
    if (navigator.share) {
      navigator.share({
        title,
        url,
        text,
        ...(files && { files }),
      }).then(resp => {
        console.log(resp)
      }).catch(e => {
        console.log(e)
      })
    }
  }

  const shareUrl = () => {
    share({
      title: 'ESPNcricinfo',
      url: 'https://www.espncricinfo.com/story/_/id/29304607/greatest-odi-batsman-all',
      text: 'Who is the greatest ODI batsman of all time?'
    })
  }

  const updateFile = e => {
    console.log(e.target.files)
    setUploadedFiles(e.target.files)
  }

  const shareFiles = (files, title) => {
    console.log(files);
    if (navigator.canShare && navigator.canShare({ files })) {
      navigator.share({
        files,
        title,
      })
      .then(() => console.log('Share was successful.'))
      .catch((error) => console.log('Sharing failed', error));
    } else {
      console.log(`Your system doesn't support sharing files.`);
    }
  }

  const shareUploadedFiles = () => {
    shareFiles(uploadedFiles, 'Your uploaded files')
  }

  const sharePhoto = async ({ fileUrl, name, title }) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const file = new File([blob], name, {type: blob.type});

      share({
        url: 'https://cra-workbox.surge.sh/api/share',
        title,
        files: [file]
      });
    } catch (err) {
      console.log(err.name, err.message);
    }
  }

  return (
    <div>
      <h3>Share API</h3>

      <h4>Share URL</h4>
      <button onClick={shareUrl} >Wanna share an interesting CricInfo article?</button>
      <hr/>

      <h4 style={{ marginTop: 20 }}>Share uploaded files</h4>
      <input type='file' onChange={updateFile} multiple />
      {uploadedFiles.length ? <button onClick={shareUploadedFiles} >Share uploaded files?</button> : null}
      <hr/>

      <h4 style={{ 
        marginTop: 20, 
        marginBottom: 20, 
      }}>Taj Mahal</h4>
      <div>
        <img src='/taj-mahal-1.jpg' alt='Taj Mahal 1' width='350' style={{ display: 'block' }} />
        <button style={{ marginBottom: 10 }} onClick={() => sharePhoto({ 
          fileUrl: 'https://cra-workbox.surge.sh/taj-mahal-1.jpg',
          title: 'TajMahal drone view',
          name: 'taj-mahal-drone-view.jpg'
        })} 
        >Share</button>

        <img src='/taj-mahal-2.jpg' alt='Taj Mahal 2' width='350' style={{ display: 'block' }} />
        <button style={{ marginBottom: 10 }} onClick={() => sharePhoto({ 
          fileUrl: 'https://cra-workbox.surge.sh/taj-mahal-2.jpg',
          title: 'TajMahal front view',
          name: 'taj-mahal-front-view.jpg'
        })} 
        >Share</button>
      </div>
    </div>
  )
}

export default ShareApi;