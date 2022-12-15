import { useState } from "react";
import AddressForm from "./AddressForm.client";
import { useServerProps } from "@shopify/hydrogen";

const EditAddressForm = ({ setIsOpen, initialAddress }) => {
  const [formData, setFormData] = useState(initialAddress);
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
    callAdressCreateApi(address).then(() => {
      setServerProps("isUpdated", Date.now());
      setIsOpen(false);
    });
  };
  return (
    <AddressForm
      setIsOpen={setIsOpen}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={formData}
    />
  );
};

export default EditAddressForm;

export async function callAdressCreateApi(address) {
  if (!address) return;
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
      return {};
    } else {
      return res.json();
    }
  } catch (error) {
    return {
      error: error.toString(),
    };
  }
}
