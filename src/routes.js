import Login from "./components/Login"
import Home from "./pages/Home"

const routes = [
    { path: '/', element: <Home /> },
    { path: "/login", element: <Login /> }
]
export default routes