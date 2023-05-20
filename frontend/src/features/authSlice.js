import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user") ? localStorage.getItem("user") : null,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    loading: "",
    error: "",
    success: "",
  },
  reducers: {
    reset(state) {
      state.error = ""
      state.loading = ""
      state.success = ""
    },

    logout(state) {
      state.user = null
      state.token = null
      state.error = ""
      state.loading = ""
      state.success = ""
      localStorage.clear()
    }
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.err) {
        state.error = action.payload.err
      } else if (action.payload.user) {
        state.user = action.payload.user
        state.success = true
        state.loading = false
        state.token = action.payload.token
        state.error = null
        localStorage.setItem('token', JSON.stringify(action.payload.token))
        localStorage.setItem('user', action.payload.user)
        reset()
      }
    })

    builder.addCase(login.pending, (state) => {
      state.loading = true
    })

    builder.addCase(login.rejected, (state, action) => {
      console.log(action.payload)
    })
  }
})

export const login = createAsyncThunk('auth/login', async (cred) => {
  const res = await fetch('http://localhost:8080/user/login', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: cred.uname, password: cred.pass })
  })
  const data = await res.json()
  // console.log(data)
  return data
})

export const { reset, logout } = authSlice.actions
export default authSlice.reducer