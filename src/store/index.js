import {configureStore, createSlice} from '@reduxjs/toolkit'


const userId = localStorage.getItem('userID') !== '' || null ? localStorage.getItem('userId') : ''
const email = localStorage.getItem('email') !== '' || null ? localStorage.getItem('email') : ''
const username = localStorage.getItem('username') !== '' || null ? localStorage.getItem('username') : ''
const description = localStorage.getItem('description') !== '' || null ? localStorage.getItem('description') : ''
const isTeacher = localStorage.getItem('userID') !== '' || null ? localStorage.getItem('isTeacher') : ''


const initialState = {
    userId: userId, 
    email: email, 
    username: username,
    description: description,
    isTeacher: isTeacher
}
// const initialState = {
//     userId: '', 
//     email: '', 
//     username: '',
//     description: '',
//     isTeacher: ''
// }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signinUser(state, action){
            localStorage.setItem('userId', action.payload.userId)
            localStorage.setItem('email', action.payload.email)
            localStorage.setItem('username', action.payload.username)
            localStorage.setItem('description', action.payload.description)
            localStorage.setItem('isTeacher', action.payload.isTeacher)
            // state.userId = action.payload.userId
            // state.email = action.payload.email
            // state.username = action.payload.username
            // state.description = action.payload.description
            // state.isTeacher = action.payload.isTeacher
        },
        signoutUser(state){
            state.userId =''
            state.email =''
            state.username = ''
            state.description =''
            state.isTeacher =''
            localStorage.clear()
        }
        
    }
})

const store = configureStore({
    reducer: userSlice.reducer
})
export const userActions = userSlice.actions;
export default store