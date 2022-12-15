import { useState } from 'react'
import AddressForm from './AddressForm.client';
import {useServerProps} from '@shopify/hydrogen'


const EditAddressForm = ({ setIsOpen, initialAddress }) => {
  const [formData, setFormData] = useState(initialAddress)
  const { setServerProps } = useServerProps()
  const handleChange = (e) => {
      setFormData({...formData,
        [e.target.name]: e.target.value,
      });
    };
    const handleSubmit = (e)=> {
      delete formData['id']
      const address = {
        formData,
        id:initialAddress.id
      }
      e.preventDefault()
      callAdressCreateApi(address)
      .then(()=>{
        setIsOpen(false)
        setServerProps("isUpdated", true)
      })
    }
    return (
        <AddressForm            
          setIsOpen={setIsOpen} 
          handleSubmit = {handleSubmit}
          handleChange = {handleChange}
          formData = {formData}
        />
    )
}

export default EditAddressForm


export async function callAdressCreateApi(address) {
  if(!address) return
  console.log(address);
  try {
    const res = await fetch(`/account/editAddress`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(address),
    });
    if (res.ok) {
      console.log(res);
      return {}
    } else {
      return res.json();
    }
  } catch (error) {
    return {
      error: error.toString(),
    };
  }
}
  