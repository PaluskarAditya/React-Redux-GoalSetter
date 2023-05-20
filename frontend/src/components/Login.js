import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/authSlice'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const nav = useNavigate()

  useEffect(() => {
    if (user || token) {
      nav('/')
    }
  }, [])

  const { user, token, loading } = useSelector(state => state.auth)

  const disp = useDispatch()

  const [cred, setCred] = useState({uname: "", pass: ""})

  const change = (e) => {
    setCred({...cred, [e.target.name]: e.target.value})
  }

  const handleSub = (e) => {
    e.preventDefault()
    disp(login(cred))
    nav('/')
  }

  return (
    <div className='login'>
      <form onSubmit={handleSub} className='d-flex flex-column'>
        <h1 className='text-white'>Login</h1>
        <div className='form-group'>
          <input type='text' className='form-control my-1' placeholder='username' autoComplete='off' name='uname' value={cred.uname} onChange={change}/>
        </div>
        <div className='form-group'>
          <input type='password' className='form-control my-1' placeholder='password' autoComplete='off' name='pass' value={cred.pass} onChange={change}/>
        </div>
        <button className='btn btn-primary my-1' type='submit' >Login</button>
      </form>
    </div>
  )
}
