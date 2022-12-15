import { useEffect, useState } from "react"
import EditAddressForm from "./EditAddressForm.client"

const AdressDetails = ({ address }) => {
  const [isOpen, setIsOpen] = useState(false)
    const openModel = (e) => {
      setIsOpen(true)
      handleEditClick()
      e.stopPropagation()
    }
    useEffect(()=>{
      window.addEventListener('click', ()=>{
        setIsOpen(false)
      })
      return ()=> {
        removeEventListener('click',window)
      }
    },[])

  const handleEditClick = () => {
    callEditAddressApi(address)
  }
  return (
    <>
      {isOpen && <EditAddressForm setIsOpen = {setIsOpen} initialAddress = {address}/>}
      {
        (address)
          &&
        <div className="px-4 py-2 justify-between flex rounded lg:w-1/4 w-3/4 bg-white shadow">
          <div>
            <p>
              {address?.firstName} {address?.lastName}
            </p>
            <p>{address?.address1}</p> 
            <p>{address?.address2}</p> 
            <p>{address?.city} {address?.province}</p> 
            <p>{address?.country}</p> 
            <p>{address?.zip}</p> 
            <p>{address?.phone}</p> 
          </div>
          <button className="h-fit underline" onClick={openModel}>Edit</button>
        </div>
      }
    </>         
  )
}

export default AdressDetails

export async function callEditAddressApi(address) {
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
