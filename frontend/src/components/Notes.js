import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allGoal, remGoal, updGoal } from '../features/goalSlice'

export default function Notes () {
  const { goals, loading } = useSelector(state => state.goal)
  const { user, token } = useSelector(state => state.auth)
  const [curr, setCurr] = useState('')
  const [id, setId] = useState('')
  const disp = useDispatch()

  useEffect(() => {
    if (user && token) {
      disp(allGoal())
    }
  }, [disp])

  const del = (id) => {
    disp(remGoal(id))
    disp(allGoal())
  }

  const edit = (note) => {
    setCurr(note.text)
    setId(note._id)
  }

  const handleUpdate = () => {
    // console.log(id, curr)
    const form = {
      id: id,
      text: curr
    }
    disp(updGoal(form))
    disp(allGoal())
  }

  return (
    <section>
      <div className='notes'>
        {
          goals ? goals.map((note) => <div className='card my-2' key={note._id} id={note._id}>
            <div className='card-body d-flex justify-content-between align-items-center'>
              <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div className='form-group'>
                        <input className='form-control text-align-center' value={curr} onChange={e => setCurr(e.target.value)} />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" onClick={handleUpdate}>update</button>
                    </div>
                  </div>
                </div>
              </div>
              <p className='card-title m-0'>{note.text}</p>
              <div>
                <button id={note._id} type="button" className="btn btn-primary mx-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>edit(note)}>
                  edit
                </button>
                <button className='btn btn-danger' onClick={() => del(note._id)}>delete</button>
              </div>
            </div>
          </div>) : <h1>No Goals at the Moment</h1>
        }
      </div>
    </section>
  )
}
