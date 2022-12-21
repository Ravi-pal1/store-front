import { useState } from "react";
import AddressForm from "./AddressForm.client";
import { useServerProps } from "@shopify/hydrogen";

const initialAddress = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  province: "",
  zip: "",
  country: "",
  phone: "",
};
const AddAdressForm = ({ setIsOpen }) => {
  const [formData, setFormData] = useState(initialAddress);
  const [formError, setFormError] = useState("");
  const { setServerProps } = useServerProps();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    callAdressCreateApi(formData).then((res) => {
      if (res?.isUpdated) {
        setIsOpen(false);
        setServerProps("isUpdated", Date.now());
        return
      }
      res.json().then(res=>{
        setFormError(res?.message)
      })
    })
    .catch(error => {
      console.log(error)
    });
  };
  return (
    <AddressForm
      setIsOpen={setIsOpen}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={formData}
      formError={formError}
    />
  );
};

export default AddAdressForm;

export async function callAdressCreateApi(formData) {
  try {
    const res = await fetch(`/account/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      return { isUpdated: true };
    } else {
      return res;
    }
  } catch (error) {
    return {
      error: error.toString(),
    };
  }
}
