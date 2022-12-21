import { Link } from "@shopify/hydrogen";
import { useNavigate } from "@shopify/hydrogen/client";
import { useState } from "react";
import formValidate from "../../../utils/formValidate";
const SignUpForm = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formError = formValidate(formData)
    if(Object.keys(formError).length !== 0){
      setFormErrors(formError)
      return
    }
    callCreateUserApi(formData).then((res) => {
      if (res?.isSignUp) {
        console.log(res?.isSignUp);
        navigate("/account/login");
        return
      }
      setFormErrors({status: "Can't create user at this moment"})
    });
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded"
                name="firstName"
                onChange={handleChange}
                required
                placeholder="First Name"
                />
              <span className="text-red-500">{formErrors.firstName}</span>
            </div>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="lastName"
              onChange={handleChange}
              required
              placeholder="Last Name"
            />
            <div className="mb-4">
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded"
                name="email"
                onChange={handleChange}
                required
                placeholder="Email"
                />
              <span className="text-red-500">{formErrors.email}</span>
            </div>
            <div className="mb-4">
              <input
                type="tel"
                className="block border border-grey-light w-full p-3 rounded"
                name="phone"
                onChange={handleChange}
                required
                placeholder="Phone"
                />
              <span className="text-red-500">{formErrors.phone}</span>
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded"
                name="password"
                onChange={handleChange}
                required
                placeholder="Password"
                />
              <span className="text-red-500">{formErrors.password}</span>
              <span className="text-red-500">{formErrors.status}</span>
            </div>
            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1"
            >
              Create Account
            </button>
          </form>
        </div>
        <div className="text-grey-dark mt-6"> 
          Already have an account?
          <Link
            to="account/login"
            className="underline border-b border-blue text-blue-600"
          >
            Log in
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

export async function callCreateUserApi(formData) {
  console.log(formData);
  try {
    const res = await fetch(`/account/signUp`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(res);
    if (res?.status === 200) {
      return { isSignUp: true };
    } else {
      return {isSignUp: false};
    }
  } catch (error) {
    return {
      error: error.toString(),
    };
  }
}
