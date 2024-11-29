import { useContext, useState } from 'react'

import AuthLayout from './modules/Shared/components/AuthLayout/AuthLayout'
import NotFound from './modules/Shared/components/NotFound/NotFound'
import Login from './modules/Auth/components/Login/Login'
import Registration from './modules/Auth/components/Registration/Registration'
import ForgetPassword from './modules/Auth/components/ForgetPassword/ForgetPassword'
import ResetPass from './modules/Auth/components/ResetPass/ResetPass'
import ProtectedRoute from './modules/Shared/components/ProtectedRoute/ProtectedRoute'
import MasterLayout from './modules/Shared/components/MasterLayout/MasterLayout'
import Dashboard from './modules/Dashboard/components/Dashboard/Dashboard'
import TasksList from './modules/Tasks/components/TasksList/TasksList'
import TasksData from './modules/Tasks/components/TasksData/TasksData'
import ProjectsData from './modules/Projects/components/ProjectsData/ProjectsData'
import ProjectsList from './modules/Projects/components/ProjectsList/ProjectsList'
import UsersList from './modules/Users/components/UsersList/UsersList'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import VerifyAccount from './modules/Auth/components/VerifyAccount/VerifyAccount'
import { ToastContainer } from 'react-toastify'
import { AuthContext } from './context/AuthContext'

function App() {
  const  LoginData  = useContext(AuthContext);


  const Routes = createBrowserRouter([
    {
      path: '',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login  /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Registration /> },
        { path: 'verifyAccount', element: <VerifyAccount /> },
        { path: 'forget-Pass', element: <ForgetPassword /> },
        { path: 'reset-pass', element: <ResetPass /> },
      ]
    },
    {
      path: 'dashboard',
      element:<ProtectedRoute loginData={LoginData}>  {/* تمرير loginData هنا */}

        <MasterLayout />
        </ProtectedRoute> ,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard  /> },
        { path: 'tasksData', element: <TasksData/> },
        { path: 'tasksList', element: <TasksList/> },
        { path: 'projectsData', element: <ProjectsData/> },
        { path: 'ProjectsList', element: <ProjectsList /> },
        { path: 'usersList', element: <UsersList/> },
      ]
    }
  ])


  return (
    <>
      <ToastContainer />
      <RouterProvider router={Routes}></RouterProvider>
    </>
  )
}

export default App
