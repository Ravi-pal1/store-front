export function LogoutButton(props) {
    const logout = () => {
      fetch('/account/logout', {method: 'POST'})
      .then(() => {
        window.location.href = '/';
      });
    };
    return (
      <div className="flex gap-2 border w-fit px-3 py-2 rounded bg-red-600 text-white cursor-pointer" onClick={logout}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
        <button>Logout</button>
      </div>
    );
}
  