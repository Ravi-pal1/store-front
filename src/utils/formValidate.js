export default function formValidate(formData) {
  const formError = {};
  if (formData.hasOwnProperty("email")) {
    if (formData.email.trim() === "") {
      formError.email = "Email is required !!";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
    ) {
      formError.email = "Please enter a valid email !!";
    }
  }
  if (formData?.name?.trim() === "") {
    formError.name = "FirstName is required !!";
  }
  if (formData?.password?.trim() === "") {
    formError.password = "password is required !!";
  }
  if (formData?.phone?.trim() === "") {
    formError.phone = "Phone No. is required !!";
  }
  if (Object.keys(formData)?.length === Object.keys(formError)?.length) {
    return { status: "Please enter input correctly" };
  }
  return formError;
}
