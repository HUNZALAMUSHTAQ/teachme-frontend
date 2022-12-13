import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import ViewQueries from './pages/teacher/ViewQueries';
import ViewQuery from './pages/teacher/ViewQuery';
import AllProposals from './pages/teacher/AllProposals';
import { useState } from 'react';
import MyQueries from './pages/student/MyQueries';
import QueryDetails from './pages/student/QueryDetails';
import SubmitQuery from './pages/student/SubmitQuery';
import UserProfile from './pages/UserProfile';
import ShowTeacherProfile from './pages/student/ShowTeacherProfile';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from './store';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  const [userId, setUserId] = useState('')
  const [isTeacher, setIsTeacher] = useState('')
  const navigate = useNavigate();
  const user = useSelector((state) => state)
  const dispatch = useDispatch();

  // const userData = {
  //   userId: localStorage.getItem('userId'),
  //   isTeacher: localStorage.getItem('isTeacher'),
  //   description: localStorage.getItem('description'),
  //   email: localStorage.getItem('email'),
  //   username: localStorage.getItem('username'),
  // }
  // dispatch(userActions.signinUser(userData))
  // console.log(user)

  useState(() => {
    setUserId(localStorage.getItem('userId'))

    // if (JSON.parse(user.isTeacher) !== '') {
    //   navigate('/123')
    // } else {
    //   navigate('/321')
    // }

  }, [])

  return (
    <Routes>
      {
        userId && <Route path='' element={JSON.parse(user.isTeacher) === true ? <Navigate to="/teacher/view-queries" /> : <Navigate to="/student/view-queries" />} />
      }
      {
        !userId && <Route path='' element={<Navigate to="/signin" />} />
      }

      {
        !userId && <Route path="/signup" element={<Signup />} />
      }
      {
        !userId && <Route path="/signin" element={<Signin />} />
      }
      <Route path='admin/login' element={<AdminLogin />} />
      <Route path='admin/dashboard' element={<AdminDashboard />} />


      <Route path='student/view-queries' element={<MyQueries />} />
      <Route path='student/view-queries/:id' element={<QueryDetails />} />
      <Route path='student/submit-query' element={<SubmitQuery />} />

      <Route path='profile' element={<UserProfile />} />
      <Route path='profile/teacher/:id' element={<ShowTeacherProfile />} />


      <Route path='teacher/view-queries' element={<ViewQueries />} />
      <Route path='teacher/view-queries/:id' element={<ViewQuery />} />
      <Route path='teacher/all-proposals' element={<AllProposals />} />


      <Route path="*" element={<h1>No Such Page Exists</h1>} />

    </Routes>
  )
}

export default App;
