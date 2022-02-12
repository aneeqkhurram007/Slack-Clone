import React, { useEffect } from 'react';
import './App.css';
import { useRoutes, useNavigate } from "react-router-dom"
import pageRoutes from "./routes"
import Header from './components/Header';
import styled from "styled-components"
import Sidebar from './components/Sidebar';
import { auth } from "./firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useDispatch } from 'react-redux'
import { addUser } from "./features/userSlice"
function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const routes = useRoutes(pageRoutes)
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (!user) {
        navigate("/login", { replace: true })
      }
      dispatch(addUser({
        user
      }))
    })

  }, [auth])

  return (
    <div className="App">
      <Header />
      <AppBody>
        <Sidebar />
        {routes}
      </AppBody>
    </div>
  );
}

export default App;
const AppBody = styled.div`
display: flex;
height: 100vh;
`