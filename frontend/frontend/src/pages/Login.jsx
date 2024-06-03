import React from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'
import { useState } from 'react'
import { useSelector} from 'react-redux' 
import { toast } from 'react-toastify' ; 
import Spinner from '../components/Spinner' ; 
import { useNavigate } from 'react-router-dom' ; 
import { useEffect } from 'react' ; 

function Login() { 
  const navigate = useNavigate() ; 
  const onSubmit = (e) => {
    e.preventDefault() ; 
    if (!email || !password) {
      toast.error('Please fill all the fields') ; 
    } 
    dispatch(login(loginData)) ; 
  } ; 
  const onChange = (e) => {
    setLoginData({...loginData , [e.target.name] : e.target.value})
  } ; 
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  }); 
  const{email , password} = loginData ; 
  const {user , isLoading , isError , isSuccess , message } = useSelector((state) => state.auth) ; 
  const dispatch = useDispatch() ;  
  useEffect(() => {
    if (isSuccess||user) {
      toast.success('Logged in successfully') ; 
      navigate('/');
    } 
    if (isError) {
      toast.error(message);
    }
  }, [user, navigate , isLoading , isError , isSuccess , message]);
if (isLoading) {
  return <Spinner />;
}
  return (
    <>
    <section className='heading'>
      <h1>
        <FaSignInAlt /> Login
      </h1>
      <p>Login and start setting goals</p>
    </section>

    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={email}
            placeholder='Enter your email'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={password}
            placeholder='Enter password'
            onChange={onChange}
          />
        </div>

        <div className='form-group'>
          <button type='submit' className='btn btn-block'>
            Submit
          </button>
        </div>
      </form>
    </section>
  </>
  )
}

export default Login