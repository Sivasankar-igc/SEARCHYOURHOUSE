import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./components/homePage.jsx";
import SignIn from "./components/signin.jsx";
import Login from "./components/login.jsx";
import Filter from "./components/filter.jsx";
import WishList from "./components/wishList.jsx";

const App=()=>{
  return(
    <BrowserRouter>
        <Routes>
          <Route index element={<HomePage/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="signin" element={<SignIn/>}/>
          <Route path="filter" element={<Filter/>}/>
          <Route path="wishlist" element={<WishList/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App;