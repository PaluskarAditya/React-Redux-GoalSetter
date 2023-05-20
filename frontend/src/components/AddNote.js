import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addGoal, allGoal } from '../features/goalSlice'

export default function AddNote() {
  const [text, setGoal] = useState('')

  const disp = useDispatch()

  const add = () => {
    disp(addGoal(text))
    disp(allGoal())
    setGoal('')
  }

  return (
    <section className='add-note mb-3'>
      <div className='form-group d-flex'>
        <input className='form-control' type='text' name='text' value={text} placeholder='enter note text' onChange={e => setGoal(e.target.value)}/>
        <button className='btn btn-primary mx-2' onClick={add}>add</button>
      </div>
    </section>
  )
}
