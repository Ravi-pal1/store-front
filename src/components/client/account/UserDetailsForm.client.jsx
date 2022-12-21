const UserDetailsForm = ({formData, setFormData, handleSubmit, setIsOpen, formError}) => {
    const handleChange = (e) => {
        setFormData({...formData,
            [e.target.name]: e.target.value,
        });
    };
    return (
      <section className="bg-black/25 fixed h-screen z-50 lg:top-24 left-0 right-0 bottom-0">
        <div
          className="flex flex-col bg-white rounded w-11/12 lg:w-2/6 m-auto shadow p-4 mt-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between h-12">
            <h2 className="mb-2 self-end">Add address</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <form 
            className="flex flex-col space-y-2" 
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="border h-10 px-2 rounded"
              value={formData?.firstName}
              name="firstName"
              onChange={handleChange}
              placeholder="First Name"
              required
            />
            <input
              type="text"
              className="border h-10 px-2 rounded"
              value={formData?.lastName}
              onChange={handleChange}
              name="lastName"
              placeholder="Last Name"
            />
            <input
              type="email"
              className="border h-10 px-2 rounded"
              value={formData?.email}
              name="email"
              onChange={handleChange}
              placeholder="House No."
              required
            />
            <input
              type="tel"
              className="border h-10 px-2 rounded"
              value={formData?.phone}
              onChange={handleChange}
              name="phone"
              placeholder="Area"
            />
            <input
              type="submit"
              value="Save"
              className="border py-2 rounded bg-gray-900 text-white"
            />
            <span className="text-red-500">{formError}</span>
          </form>
        </div>
      </section>
    )
  }
  
  export default UserDetailsForm