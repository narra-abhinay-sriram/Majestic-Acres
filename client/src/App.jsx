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
import Listing from "./pages/Listing"
import Search from "./pages/Search"

const App = () => {
  return (
    <BrowserRouter>
    <div className="fixed z-10  w-screen">
    <Header/>
    </div>
    
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

<Route path="/listing/:listing"  element={<Listing/>} />
<Route path="/search" element={<Search/>} />




   </Routes>
    
    </BrowserRouter>
   
  )
}

export default App
