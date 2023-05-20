import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const goalSlice = createSlice({
  name: "goal",
  initialState: {
    goals: [],
    loading: ""
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(allGoal.fulfilled, (state, action) => {
      state.goals = action.payload.goals
      state.loading = false
    })

    builder.addCase(allGoal.pending, (state) => {
      state.loading = true
    })
  }
})

export const allGoal = createAsyncThunk("goal/all", async () => {
  const res = await fetch('http://localhost:8080/note/all', {
    method: "GET",
    mode: 'cors',
    headers: {
      'Content-type':"application/json",
      "token": localStorage.getItem('token')
    }
  })
  const data = await res.json()
  return data
})

export const addGoal = createAsyncThunk('goal/add', async(text) => {
  const res = await fetch('http://localhost:8080/note/add', {
    method: "POST",
    mode: "cors",
    headers: {
      'Content-Type': "application/json",
      "token": localStorage.getItem('token'),
    },
    body: JSON.stringify({text})
  })
  const data = await res.json()
  return data
})

export const remGoal = createAsyncThunk('goal/delete', async (id) => {
  const res = await fetch(`http://localhost:8080/note/remove`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'token': localStorage.getItem('token'),
    },
    body: JSON.stringify({id})
  })
  const data = await res.json()
  return data
})

export const updGoal = createAsyncThunk('goal/update', async (note) => {
  const res = await fetch('http://localhost:8080/note/update', {
    method: "PATCH",
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'token': localStorage.getItem('token'),
    },
    body: JSON.stringify({id: note.id, text: note.text})
  })
  const data = await res.json()
  return data
})

export default goalSlice.reducer