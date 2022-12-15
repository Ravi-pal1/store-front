import { useEffect, useState } from "react"
import AddAdressForm from "./AddAdressForm.client"

const AddAddressButton = () => {
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
            {isOpen && <AddAdressForm setIsOpen = {setIsOpen}/>}
            <button
              onClick={openModel}
              className = "w-fit mb-4 underline"
            >Add Adress</button>
        </>
    )
}

export default AddAddressButton