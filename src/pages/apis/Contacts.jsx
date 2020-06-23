import React, { useState } from 'react'
import Back from '../../components/Back'

const Contacts = props => {
  const [contacts, setContacts] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const fetchContacts = () => {
    var api = (navigator.contacts || navigator.mozContacts);
     
    const chromeContactProps = ['name', 'tel', 'email']

    if (api && !!api.select) { // new Chrome API
      api.select(chromeContactProps, { multiple: true })
        .then(setContacts)
        .catch(e => setErrorMessage(e.message));
        
    } else if (api && !!api.find) { // old Firefox OS API
      var criteria = {
        sortBy: 'familyName',
        sortOrder: 'ascending'
      };
  
      api.find(criteria)
        .then(setContacts)
        .catch(err => setErrorMessage(err.message));
        
    } else {
      setErrorMessage('Contacts API not supported.');
    }
  }

  return (
    <div>
      <Back/>

      <h3>Contacts API</h3>
      <button onClick={fetchContacts} >Fetch contacts</button>
      <br/>
      <br/>

      {contacts.map((contact, index) => {
        return (
          <>
          <div key={index}>
            <div>
              Name: {contact.name[0]}
            </div>
            <div>
              Email: {contact.email[0]}
            </div>
            <div>
              Phone numbers: 
              <ul>
                {contact.tel.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          </div>
          <br/>
          </>
        )
      })}

      <div><b>{errorMessage}</b></div>
    </div>
  )
}

export default Contacts;