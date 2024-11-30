
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom';
interface MasterLayoutProps {
  loginData: any; 
}
export default function MasterLayout({loginData}:MasterLayoutProps):any {
  return (<>
    <Navbar loginData={loginData}/>
    <div className='d-flex'>
      <div className="w-100">
        <Outlet/>
      
      </div>
    </div>
  </>
  )
}
