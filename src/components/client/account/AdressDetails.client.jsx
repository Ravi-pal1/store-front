import { useEffect, useState } from "react"
import EditAdressForm from "./EditAdressForm.client"

const AdressDetails = ({ defaultAddress }) => {
  const [isOpen, setIsOpen] = useState(false)
  const openModel = (e) => {
    setIsOpen(true)
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
  return (
    <>
      {
        (defaultAddress)
        ? <section className="border border-red-600">
            <h2 className='text-xl font-bold mb-2'>Adress Book</h2>
            <div className="px-4 py-2 rounded w-1/4 flex justify-between bg-white shadow">
              <address>
                {`${defaultAddress.firstName} ${defaultAddress.lastName}`} <br/>
                {defaultAddress?.address1} <br/>
                {defaultAddress?.address2 &&  <br/>}
                {defaultAddress?.city + ' '}
                {defaultAddress?.province} <br/>
                {defaultAddress?.country + ' '}
                {defaultAddress?.zip} <br/>
                {defaultAddress?.phone} <br/>
              </address>
              <div className="text-gray-600">
                Default 
              </div>
            </div>
          </section>
        :<section>
          <div className='space-y-3 bg-white shadow rounded p-6'>
            <p className='text-sm'>You havn't saved any adresses yet.</p> 
          </div>
        </section>
      }
      <button className='block border w-fit px-3 py-2 text-white rounded bg-yellow-800' onClick={openModel}>Add an Address</button>
      {
        isOpen && <EditAdressForm setIsOpen = {setIsOpen}/>
      }
    </>
                
  )
}

export default AdressDetails