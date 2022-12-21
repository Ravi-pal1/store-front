import { useState } from "react";
import AddressForm from "./AddressForm.client";
import { useServerProps } from "@shopify/hydrogen";
import { callEditAddressApi } from "./AddressDetails.client";

const EditAddressForm = ({ setIsOpen, initialAddress }) => {
  const [formData, setFormData] = useState(initialAddress);
  const [formError, setFormError] = useState()
  const { setServerProps } = useServerProps();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    delete formData["id"];
    const address = {
      formData,
      id: initialAddress.id,
    };
    callEditAddressApi(address)
      .then((res) => {
        if(res?.isUpdated){
          setServerProps("isUpdated", Date.now());
          setIsOpen(false);
          return
        }
        res.json().then(res=>{
          setFormError(res?.message)
        })
      })
      .catch(error => {
        console.log("error is " + error)
      })
  };
  return (
    <AddressForm
      setIsOpen={setIsOpen}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={formData}
      formError = {formError}
    />
  );
};

export default EditAddressForm;

