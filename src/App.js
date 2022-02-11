import React from 'react';
import './App.css';
import { useRoutes } from "react-router-dom"
import pageRoutes from "./routes"
import Header from './components/Header';
import styled from "styled-components"
import Sidebar from './components/Sidebar';

function App() {
  const routes = useRoutes(pageRoutes)
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