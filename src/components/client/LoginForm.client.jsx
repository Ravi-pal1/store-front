import { useNavigate } from '@shopify/hydrogen/client';
import { useRef, useState } from 'react';
import formValidate from '../../utils/formValidate';
import { Link } from '@shopify/hydrogen'
export async function callLoginApi({email, password}) {
  try {
    const res = await fetch(`/account/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });
    if (res.ok) {
      return {isLogin: true}
    } else {
      return res.json();
    }
  } catch (error) {
    return {
      error: error.toString(),
    };
  }
}
  
  
const LoginForm = () => {
  const [formError, setFormError] = useState({})
  const navigate = useNavigate()
  const formData = useRef({
    email: '',
    password: ''
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    const formValidatte =  formValidate(formData.current)
    setFormError(formValidatte)
    if(Object.keys(formValidatte).length !== 0) {
      return
    }
    callLoginApi(formData.current).then((res)   => {
      if(res?.isLogin) {
        navigate('/account')
      }
      else {
        setFormError(res?.error[0])
      }
    })
  }
  
  return (
        <div className="bg-slate-50 min-h-screen">
            <div className="flex flex-col items-center justify-center w-full space-y-8 h-full py-16">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                </div>
                <form   
                    className="pb-16 rounded shadow py-4 space-y-12 bg-white px-4 lg:w-2/6 w-4/5 md:w-3/5"
                    onSubmit={handleSubmit}
                >
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="space-y-4 rounded-md shadow-sm w-11/12 mx-auto">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input 
                              id="email-address" 
                              name="email" 
                              type="text" 
                              autoComplete="email" 
                              className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" 
                              placeholder="Email address" 
                              onChange={(e)=>formData.current.email = e.target.value}
                              required 
                            />
                            <span className='text-red-500'>{formError?.email}</span>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input 
                              id="password" 
                              name="password" 
                              type="password" 
                              autoComplete="current-password"
                              className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" 
                              placeholder="Password" 
                              onChange={(e)=> formData.current.password = e.target.value}
                              required 
                            />
                            <span className='text-red-500'>
                              {formError?.password}
                              {formError?.status}
                              {formError?.message}
                            </span>
                        </div>
                    </div>
                    <div className="w-11/12 mx-auto">
                        <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            {/* Heroicon name: mini/lock-closed */}
                            <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                            </svg>
                            </span>
                            Sign in
                        </button>
                        <div className='text-center mt-4'>
                          <Link to = '/account/signUp'>Didn't have an account? <span className='underline'>Sign Up</span></Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default LoginForm