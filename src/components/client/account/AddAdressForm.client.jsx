import { useState } from "react";
import AddressForm from "./AddressForm.client";

const initialAddress = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  province: '',
  zip: '',
  country: '',
  phone: ''
}
const AddAdressForm = ({ setIsOpen }) => {
  const [formData, setFormData] = useState(initialAddress);
  const handleChange = (e) => {
    setFormData({...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e)=> {
    e.preventDefault()
    callAdressCreateApi(formData)
    .then(()=>{
      setIsOpen(false)
    })
  }
  return (
    <AddressForm 
      setIsOpen={setIsOpen} 
      handleSubmit = {handleSubmit}
      handleChange = {handleChange}
      formData = {formData}
    />
  );
};

export default AddAdressForm;

export async function callAdressCreateApi(formData) {
  try {
    const res = await fetch(`/account/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
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