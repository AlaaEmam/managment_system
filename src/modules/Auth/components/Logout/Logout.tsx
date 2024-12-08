import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout() {

    const navigate = useNavigate();
    useEffect(() => {
      const logOut = () => {
        localStorage.removeItem("token");
        navigate("/");
      };

      logOut();
    }, []);

  return (
    <div>
      logout
    </div>
  )
}
