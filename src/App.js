import './App.css';
// import Navbar from './components/Navbar.js'
import Home from './screens/Home.js'
import Signup from './screens/Signup.js'
import MyOrder from './screens/MyOrder.js'

import {
  BrowserRouter as Router,
  Routes,
  Route,
   
} from "react-router-dom";

import Login from './screens/Login.js'
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import { CartProvider } from './components/ContextReducer';
function App() {
  return (
 <CartProvider>
 <Router>
  <div>
  <Routes>
  <Route exact path="/" element={<Home/>}/>
  <Route exact path="/login" element={<Login/>}/>
  <Route exact path="/createuser" element={<Signup/>}/>
  <Route exact path="/myorder" element={<MyOrder/>}/>

  </Routes>
  </div>
  </Router>

 </CartProvider>
  

  );
}

export default App;
