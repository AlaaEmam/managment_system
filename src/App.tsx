import { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'

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
import ChangePassword from './modules/Auth/components/ChangePassword/ChangePassword'


function App() {
  
  const  LoginData  = useContext(AuthContext);


  const Routes = createBrowserRouter([
    {
      path: '',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login/> },
        { path: 'login', element: <Login/> },
        { path: 'register', element: <Registration /> },
        { path: 'verification', element: <VerifyAccount /> },

        { path: 'forget-Password', element: <ForgetPassword /> },
        { path: 'reset-password', element: <ResetPass /> },
        
        { path: 'change-password', element: <ChangePassword /> },
      ]
    },

    {
      path: 'dashboard',
      element:<ProtectedRoute loginData={LoginData}>  {/* تمرير loginData هنا */}

        <MasterLayout/>
        </ProtectedRoute> ,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard  /> },
        { path: 'tasks-data', element: <TasksData/> },
        { path: 'tasks', element: <TasksList/> },
        { path: 'project-data', element: <ProjectsData/> },
        { path: 'projects-list', element: <ProjectsList /> },
        { path: 'users', element: <UsersList/> },

      ]
    }
  ])


  return (
    <>
      <RouterProvider router={Routes}></RouterProvider>
      <ToastContainer />

    </>
  )
}

export default App
