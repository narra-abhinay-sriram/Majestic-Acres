import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Header from "./components/Header"
import Privateroute from "./components/Privateroute"
import Createlist from "./pages/createlist"
import Editlist from "./pages/editlist"

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
   <Routes>
<Route  path="/" element={<Home/>} />
<Route path="/signin" element={<Signin/>} />
<Route path="/signup" element={<Signup/>} />
<Route path="/about" element={<About/>} />
<Route element={<Privateroute/>}>
  <Route path="/profile" element={<Profile/>} />
  <Route path="/createlisting" element ={<Createlist/>} />
  <Route path="/Editlist/:id" element ={<Editlist/>} />

</Route>




   </Routes>
    
    </BrowserRouter>
   
  )
}

export default App
