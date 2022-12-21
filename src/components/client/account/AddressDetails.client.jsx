import { useEffect, useState } from "react";
import AddressOptionModel from "./AddressOptionModel.client";
import EditAddressForm from "./EditAddressForm.client";
import {useServerProps} from '@shopify/hydrogen'

const AddressDetails = ({ address }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setServerProps } = useServerProps()
  const openModel = () => {
    setIsOpen(true);
  };
  useEffect(() => {
    window.addEventListener("click", () => {
      setIsOpen(false);
    });
    return () => {
      removeEventListener("click", window);
    };
  }, []);

  const handleEditButton = () => {
    openModel()
  };
  
  const handleDeleteButton = () =>{
    callAdressDeleteApi({id: address.id})
    .then(()=>setServerProps("isUpdated", Date.now()))
  }
  return (
    <>
      {isOpen && (
        <EditAddressForm setIsOpen={setIsOpen} initialAddress={address} />
      )}
      {address && (
        <div className="px-4 py-2 justify-between flex rounded lg:w-1/4 w-full bg-white shadow">
          <div>
            <p>
              {address?.firstName} {address?.lastName}
            </p>
            <p>{address?.address1}</p>
            <p>{address?.address2}</p>
            <p>
              {address?.city} {address?.province}
            </p>
            <p>{address?.country}</p>
            <p>{address?.zip}</p>
            <p>{address?.phone}</p>
          </div>
          <AddressOptionModel
            handleDeleteButton = {handleDeleteButton}
            handleEditButton = {handleEditButton}
          />
        </div>
      )}
    </>
  );
};

export default AddressDetails;

export async function callEditAddressApi(address) {
  try {
    const res = await fetch(`/account/editAddress`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    });
    if (res.ok) {
      return {isUpdated: true};
    } else {
      return res
    }
  } catch (error) {
    return {
      error: error.toString(),
    };
  }
}

export async function callAdressDeleteApi(address) {
  if(!address) return
  try {
    const res = await fetch(`/account/deleteAddress`, {
      method: 'DELETE',
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