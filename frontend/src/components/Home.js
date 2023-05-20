import React from 'react'
import AddNote from './AddNote'
import Notes from './Notes'
import { useSelector } from 'react-redux'

export default function Home() {
  const { user, token, loading } = useSelector(state => state.auth)
  return (
    <div className='home'>
      {
        user || token ? <><AddNote />
        <Notes /></> : 
        <h1 className='text-white'>Login/Signup to create Goals</h1>
      }
    </div>
  )
}
